"""Skill service — manage thinking-framework skills (people-skill integration).

Skills are stored as .md files with YAML frontmatter in
``backend/skills/`` — shipped with the codebase. Each skill
contains a person's "thinking operating system" (system prompt) that
gets injected into chat messages when the user selects it.
"""

import logging
import re
from pathlib import Path
from typing import List, Dict, Any, Optional

import yaml


logger = logging.getLogger(__name__)

SKILLS_DIR = "skills"  # stored in backend/skills/, NOT in user data dir

# Auto-assigned icons and categories based on description keywords
_CATEGORY_KEYWORDS = {
    "business": ["投资", "商业", "决策", "管理", "创业", "entrepreneur", "investor", "business"],
    "science": ["科学", "物理", "编程", "工程", "AI", "machine learning", "research", "physics"],
    "content": ["内容", "增长", "视频", "社交", "content", "growth", "video", "social"],
    "thinking": ["思维", "认知", "心智", "哲学", "thinking", "cognitive", "mental"],
}

_PERSON_ICONS = {
    "munger": "🧓", "elon-musk": "🚀", "feynman": "🎯", "steve-jobs": "🍎",
    "paul-graham": "📝", "naval": "⚓", "taleb": "📊", "karpathy": "💻",
    "ilya-sutskever": "🧠", "mrbeast": "🎬", "trump": "🏛️", "zhang-yiming": "📱",
    "zhangxuefeng": "🎓", "x-mentor": "🐦", "nuwa": "🔮",
}


def _skills_path() -> Path:
    """Skills live in backend/skills/ alongside the code, not in the user
    data dir. This way they ship with the distribution and don't need
    auto-import or copying to ~/.quantclass/data/.
    """
    return Path(__file__).parent.parent / SKILLS_DIR


def ensure_skills_dir() -> Path:
    p = _skills_path()
    p.mkdir(parents=True, exist_ok=True)
    return p


def _parse_skill_md(filepath: Path) -> Optional[Dict[str, Any]]:
    """Parse a skill .md file (YAML frontmatter + system prompt body)."""
    try:
        text = filepath.read_text(encoding="utf-8")
        match = re.match(r'^---\n(.*?)\n---\n(.*)', text, re.DOTALL)
        if not match:
            return None
        meta = yaml.safe_load(match.group(1)) or {}
        prompt = match.group(2).strip()

        # Derive id from filename if not in meta
        skill_id = meta.get("id") or filepath.stem
        # Extract display_name from first H1 heading in body
        h1_match = re.search(r'^#\s+(.+)', prompt, re.MULTILINE)
        display_name = meta.get("display_name") or (h1_match.group(1).strip() if h1_match else meta.get("name", skill_id))

        # Check if a custom avatar icon exists
        icon_file = _skills_path() / "icons" / f"{skill_id}.png"
        icon_url = f"/api/skills/{skill_id}/icon" if icon_file.exists() else None

        return {
            "id": skill_id,
            "name": meta.get("name", skill_id),
            "display_name": display_name,
            "description": meta.get("description", ""),
            "category": meta.get("category", "thinking"),
            "icon": meta.get("icon") or _auto_icon(skill_id),
            "icon_url": icon_url,
            "enabled": meta.get("enabled", True),
            "order": meta.get("order", 99),
            "prompt": prompt,
        }
    except Exception as e:
        logger.warning(f"Failed to parse skill {filepath}: {e}")
        return None


def _write_skill_md(skill_id: str, data: Dict[str, Any]) -> None:
    """Write a skill .md file."""
    path = _skills_path() / f"{skill_id}.md"
    meta = {
        "id": skill_id,
        "name": data.get("name", skill_id),
        "display_name": data.get("display_name", ""),
        "description": data.get("description", ""),
        "category": data.get("category", "thinking"),
        "icon": data.get("icon", "🧠"),
        "enabled": data.get("enabled", True),
        "order": data.get("order", 99),
    }
    prompt = data.get("prompt", "")
    content = f"---\n{yaml.dump(meta, allow_unicode=True, default_flow_style=False)}---\n{prompt}\n"
    path.write_text(content, encoding="utf-8")


def list_skills(enabled_only: bool = False) -> List[Dict[str, Any]]:
    """List all skills. Returns metadata without the full prompt body."""
    skills_dir = _skills_path()
    if not skills_dir.exists():
        return []
    result = []
    for f in sorted(skills_dir.glob("*.md")):
        skill = _parse_skill_md(f)
        if skill:
            if enabled_only and not skill.get("enabled", True):
                continue
            # Don't send the full prompt in listing (can be 30KB+)
            listing = {k: v for k, v in skill.items() if k != "prompt"}
            listing["prompt_length"] = len(skill.get("prompt", ""))
            result.append(listing)
    result.sort(key=lambda s: s.get("order", 99))
    return result


def get_skill(skill_id: str) -> Optional[Dict[str, Any]]:
    """Get a single skill including its full prompt."""
    path = _skills_path() / f"{skill_id}.md"
    if path.exists():
        return _parse_skill_md(path)
    return None


def get_skill_prompt(skill_id: str) -> Optional[str]:
    """Get only the system prompt body of a skill."""
    skill = get_skill(skill_id)
    return skill.get("prompt") if skill else None


def create_skill(skill_id: str, data: Dict[str, Any]) -> Dict[str, Any]:
    _write_skill_md(skill_id, data)
    return get_skill(skill_id)


def update_skill(skill_id: str, updates: Dict[str, Any]) -> Optional[Dict[str, Any]]:
    existing = get_skill(skill_id)
    if not existing:
        return None
    merged = {**existing, **{k: v for k, v in updates.items() if v is not None}}
    _write_skill_md(skill_id, merged)
    return get_skill(skill_id)


def delete_skill(skill_id: str) -> bool:
    path = _skills_path() / f"{skill_id}.md"
    if path.exists():
        path.unlink()
        return True
    return False


def _auto_category(description: str) -> str:
    """Guess category from description keywords."""
    desc_lower = (description or "").lower()
    for cat, keywords in _CATEGORY_KEYWORDS.items():
        if any(kw.lower() in desc_lower for kw in keywords):
            return cat
    return "thinking"


def _auto_icon(skill_id: str) -> str:
    """Pick an icon based on skill id."""
    for key, icon in _PERSON_ICONS.items():
        if key in skill_id:
            return icon
    return "🧠"


def import_skill_from_file(source_path: Path) -> Optional[Dict[str, Any]]:
    """Import a SKILL.md from an external directory into the skills store.

    The source file is expected to have YAML frontmatter with at least
    ``name`` and ``description``. The ``id`` is derived from the ``name``
    field (slugified). Extra fields (category, icon, display_name) are
    auto-assigned and persisted in the rewritten frontmatter.
    """
    if not source_path.exists():
        return None

    try:
        text = source_path.read_text(encoding="utf-8")
        match = re.match(r'^---\n(.*?)\n---\n(.*)', text, re.DOTALL)
        if not match:
            return None
        meta = yaml.safe_load(match.group(1)) or {}
        prompt = match.group(2).strip()

        raw_name = meta.get("name", source_path.parent.name)
        # Derive id: "munger-perspective" → "munger-perspective"
        skill_id = re.sub(r'[^a-z0-9_-]', '-', raw_name.lower()).strip('-')
        if not skill_id:
            skill_id = source_path.parent.name

        # Extract display name from first H1
        h1 = re.search(r'^#\s+(.+)', prompt, re.MULTILINE)
        display_name = h1.group(1).strip() if h1 else raw_name

        # Truncate description for storage (keep first 500 chars)
        desc = meta.get("description", "")
        if len(desc) > 500:
            desc = desc[:500] + "..."

        data = {
            "name": raw_name,
            "display_name": display_name,
            "description": desc,
            "category": _auto_category(desc),
            "icon": _auto_icon(skill_id),
            "enabled": True,
            "order": 99,
            "prompt": prompt,
        }

        _write_skill_md(skill_id, data)
        logger.info(f"Imported skill: {skill_id} ({display_name})")
        return get_skill(skill_id)
    except Exception as e:
        logger.warning(f"Failed to import skill from {source_path}: {e}")
        return None


def import_skills_batch(source_dir: str) -> List[Dict[str, Any]]:
    """Import all */SKILL.md files from a directory (e.g. people-skill repo)."""
    ensure_skills_dir()
    root = Path(source_dir)
    if not root.is_dir():
        return []

    results = []
    for skill_md in sorted(root.glob("*/SKILL.md")):
        # Skip nuwa-skill (it's a meta-skill for generating other skills)
        if "nuwa-skill" in str(skill_md):
            continue
        skill = import_skill_from_file(skill_md)
        if skill:
            # Don't include full prompt in batch result
            results.append({k: v for k, v in skill.items() if k != "prompt"})
    return results
