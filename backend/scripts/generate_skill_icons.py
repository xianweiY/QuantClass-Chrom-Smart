#!/Users/jornason/anaconda3/envs/GNN/bin/python
# -*- coding: utf-8 -*-
"""Generate Q-style cartoon circular avatar icons for each skill person.

Uses nano-banana-pro API (same as generate_spec_images.py).
Run once:
    /Users/jornason/anaconda3/envs/GNN/bin/python backend/scripts/generate_skill_icons.py

Output: backend/skills/icons/{skill_id}.png (128x128 circular PNG with alpha)
"""

import json
import time
import requests
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed
from PIL import Image, ImageDraw
import io

# ── 配置 ──────────────────────────────────────────────────────────
API_KEYS = [
    "sk-967eb260c5704cb5a28ba86cb634cdbd",
    "sk-ddd44351dc464117a94621cd0b5f2785",
    "sk-a7aee794a1084a4fa3972171edd616a6",
    "sk-63f656d868bd4786b8f2c699d719696b",
    "sk-4a837c400d9544abb2b71a8976a53dec",
    "sk-0a593928c7384012934c3417526d194d",
    "sk-949a70a5d3cd4e2a9df309c2be5d5bad",
    "sk-294929973750431ea168d415302a18eb",
]
MAX_WORKERS = len(API_KEYS)
MODEL = "nano-banana-pro"
API_URL = "https://grsai.dakka.com.cn/v1/draw/nano-banana"
ASPECT_RATIO = "1:1"
IMAGE_SIZE = "1K"
MAX_RETRIES = 3
TIMEOUT = 300

ICONS_DIR = Path(__file__).parent.parent / "skills" / "icons"

STYLE = (
    "Cute chibi Q-version cartoon portrait avatar, adorable kawaii anime style, "
    "big round head with expressive cute eyes, soft pastel colors, "
    "clean vector illustration, solid pure white background, "
    "centered face close-up, professional circular app icon, "
    "high quality, no text, no watermark"
)

PERSONS = [
    ("elon-musk-skill", f"Portrait of Elon Musk, tech CEO, short dark hair, confident smirk, wearing dark jacket. {STYLE}"),
    ("feynman-skill", f"Portrait of Richard Feynman, physicist, playful warm smile, wavy brown hair, wearing casual shirt. {STYLE}"),
    ("ilya-sutskever-skill", f"Portrait of Ilya Sutskever, AI researcher, round glasses, short brown hair, thoughtful expression, wearing casual outfit. {STYLE}"),
    ("karpathy-skill", f"Portrait of Andrej Karpathy, AI engineer, friendly smile, short dark hair, casual hoodie. {STYLE}"),
    ("mrbeast-skill", f"Portrait of MrBeast Jimmy Donaldson, young YouTuber, baseball cap, big excited smile, energetic expression. {STYLE}"),
    ("munger-skill", f"Portrait of Charlie Munger, elderly wise investor, thick round glasses, white hair, dignified calm expression, wearing suit. {STYLE}"),
    ("naval-skill", f"Portrait of Naval Ravikant, philosopher entrepreneur, dark beard, calm serene zen-like expression, simple shirt. {STYLE}"),
    ("paul-graham-skill", f"Portrait of Paul Graham, startup mentor, bald head, thoughtful expression, simple casual shirt. {STYLE}"),
    ("steve-jobs-skill", f"Portrait of Steve Jobs, Apple CEO, iconic black turtleneck, round glasses, intense focused look. {STYLE}"),
    ("taleb-skill", f"Portrait of Nassim Taleb, intellectual author, bald head, broad build, confident assertive expression, dark shirt. {STYLE}"),
    ("trump-skill", f"Portrait of Donald Trump, businessman, distinctive golden blonde hair, confident expression, blue suit red tie. {STYLE}"),
    ("x-mentor-skill", f"Portrait of a Chinese male tech mentor in his 30s, professional glasses, warm friendly smile, wearing neat shirt. {STYLE}"),
    ("zhang-yiming-skill", f"Portrait of Zhang Yiming, Chinese tech CEO, glasses, neat short black hair, calm focused expression, casual outfit. {STYLE}"),
    ("zhangxuefeng-skill", f"Portrait of Zhang Xuefeng, Chinese male education counselor in his 30s, energetic enthusiastic expression, short black hair, friendly smile. {STYLE}"),
]


def make_circular(img: Image.Image, size: int = 128) -> Image.Image:
    """Crop image to a circle with transparent background."""
    img = img.resize((size, size), Image.LANCZOS)
    mask = Image.new("L", (size, size), 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0, size - 1, size - 1), fill=255)
    result = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    result.paste(img.convert("RGBA"), (0, 0))
    result.putalpha(mask)
    return result


def generate_image(prompt: str, api_key: str, label: str = "") -> str | None:
    """Call nano-banana API, return image URL on success."""
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}",
    }
    payload = {
        "model": MODEL,
        "prompt": prompt,
        "aspectRatio": ASPECT_RATIO,
        "imageSize": IMAGE_SIZE,
    }

    for attempt in range(MAX_RETRIES):
        try:
            print(f"  [{label}] Generating... (attempt {attempt + 1}/{MAX_RETRIES}) [key ...{api_key[-6:]}]")
            resp = requests.post(API_URL, headers=headers, json=payload, stream=True, timeout=TIMEOUT)
            resp.raise_for_status()

            for line in resp.iter_lines():
                if not line:
                    continue
                line_str = line.decode("utf-8")
                if not line_str.startswith("data: "):
                    continue
                try:
                    data = json.loads(line_str[6:])
                    status = data.get("status")
                    progress = data.get("progress", 0)

                    if progress in (1, 25, 50, 75, 100) or status != "running":
                        print(f"  [{label}] Progress: {progress}% - Status: {status}")

                    if status == "succeeded" and data.get("results"):
                        return data["results"][0]["url"]
                    elif status == "failed":
                        reason = data.get("failure_reason", "unknown")
                        print(f"  [{label}] Failed: {reason}")
                        if attempt < MAX_RETRIES - 1:
                            break
                        return None
                except json.JSONDecodeError:
                    continue

            if attempt < MAX_RETRIES - 1:
                time.sleep(2)

        except Exception as e:
            print(f"  [{label}] Error: {e}")
            if attempt < MAX_RETRIES - 1:
                time.sleep(2)
            else:
                return None

    return None


def download_and_crop(url: str, out_path: Path) -> bool:
    """Download image, crop to 128x128 circle, save as PNG."""
    try:
        resp = requests.get(url, timeout=60)
        resp.raise_for_status()
        img = Image.open(io.BytesIO(resp.content))
        circular = make_circular(img, 128)
        out_path.parent.mkdir(parents=True, exist_ok=True)
        circular.save(out_path, "PNG")
        return True
    except Exception as e:
        print(f"  Download/crop failed: {e}")
        return False


def process_one(skill_id: str, prompt: str, api_key: str, index: int, total: int) -> tuple[str, bool]:
    """Generate a single icon (for thread pool)."""
    out_path = ICONS_DIR / f"{skill_id}.png"
    label = f"{index+1}/{total}"

    if out_path.exists():
        print(f"[{label}] {skill_id}.png already exists, skipping.")
        return (skill_id, True)

    print(f"[{label}] Generating {skill_id}.png...")
    url = generate_image(prompt, api_key, label)
    if url:
        if download_and_crop(url, out_path):
            print(f"[{label}] Saved: {out_path}")
            return (skill_id, True)
    print(f"[{label}] FAILED: {skill_id}.png")
    return (skill_id, False)


def main():
    print("=" * 60)
    print("Skill Avatar Icon Generator (nano-banana-pro, 8-key parallel)")
    print(f"Persons: {len(PERSONS)}")
    print(f"Output: {ICONS_DIR}")
    print(f"Workers: {MAX_WORKERS}")
    print("=" * 60)

    ICONS_DIR.mkdir(parents=True, exist_ok=True)

    ok = 0
    failed = []

    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
        futures = {}
        for i, (skill_id, prompt) in enumerate(PERSONS):
            api_key = API_KEYS[i % MAX_WORKERS]
            future = executor.submit(process_one, skill_id, prompt, api_key, i, len(PERSONS))
            futures[future] = skill_id

        for future in as_completed(futures):
            skill_id = futures[future]
            _, success = future.result()
            if success:
                ok += 1
            else:
                failed.append(skill_id)

    print(f"\n{'=' * 60}")
    print(f"Results: {ok} succeeded, {len(failed)} failed, {len(PERSONS)} total")
    if failed:
        print("Failed:")
        for name in failed:
            print(f"  - {name}")
    print("=" * 60)


if __name__ == "__main__":
    main()
