"""Skill router — CRUD for thinking-framework skills + batch import."""

from pathlib import Path
from typing import List, Optional
from fastapi import APIRouter
from fastapi.responses import FileResponse
from pydantic import BaseModel, Field
from models import success, param_error, not_found, internal_error
from services.skill_service import (
    list_skills, get_skill, create_skill, update_skill,
    delete_skill, import_skills_batch, _skills_path,
)

router = APIRouter(tags=["Skill"])


class SkillCreateRequest(BaseModel):
    id: str = Field(..., min_length=1, max_length=80, pattern=r'^[a-z0-9_-]+$')
    name: str = Field(..., min_length=1)
    display_name: Optional[str] = None
    description: str = Field(default="")
    category: str = Field(default="thinking")
    icon: str = Field(default="🧠")
    prompt: str = Field(..., min_length=1)
    enabled: bool = Field(default=True)
    order: int = Field(default=99)


class SkillUpdateRequest(BaseModel):
    name: Optional[str] = None
    display_name: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    icon: Optional[str] = None
    prompt: Optional[str] = None
    enabled: Optional[bool] = None
    order: Optional[int] = None


class SkillImportRequest(BaseModel):
    source_dir: str = Field(..., min_length=1, description="Path to people-skill repo root")


@router.get("")
async def get_skills(enabled_only: bool = False):
    """List all available skills (without full prompt body)."""
    try:
        return success(list_skills(enabled_only=enabled_only))
    except Exception as e:
        return internal_error(str(e))


@router.get("/{skill_id}/icon")
async def get_skill_icon(skill_id: str):
    """Serve the skill's avatar icon PNG (128x128 circular)."""
    icon_path = _skills_path() / "icons" / f"{skill_id}.png"
    if not icon_path.exists():
        return not_found(f"Icon not found for: {skill_id}")
    return FileResponse(icon_path, media_type="image/png", headers={"Cache-Control": "public, max-age=86400"})


@router.get("/{skill_id}")
async def get_skill_detail(skill_id: str):
    """Get a single skill including its full system prompt."""
    skill = get_skill(skill_id)
    if not skill:
        return not_found(f"Skill not found: {skill_id}")
    return success(skill)


@router.post("")
async def create_new_skill(request: SkillCreateRequest):
    try:
        result = create_skill(request.id, request.model_dump())
        return success(result)
    except Exception as e:
        return internal_error(str(e))


@router.put("/{skill_id}")
async def update_existing_skill(skill_id: str, request: SkillUpdateRequest):
    result = update_skill(skill_id, request.model_dump(exclude_none=True))
    if not result:
        return not_found(f"Skill not found: {skill_id}")
    return success(result)


@router.delete("/{skill_id}")
async def delete_existing_skill(skill_id: str):
    if delete_skill(skill_id):
        return success({"deleted": True})
    return not_found(f"Skill not found: {skill_id}")


@router.post("/import")
async def import_skills(request: SkillImportRequest):
    """Batch import */SKILL.md files from a directory."""
    try:
        results = import_skills_batch(request.source_dir)
        return success({
            "imported": len(results),
            "skills": results,
        })
    except Exception as e:
        return internal_error(str(e))
