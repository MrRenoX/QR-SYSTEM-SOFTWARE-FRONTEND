"""
Generates the brand SVGs and warm placeholder photography for the project.

Replace anything in public/images/ with real photography when it's licensed —
the file names, aspect ratios and crops are already what the components expect.
"""

import math
import os
import random

from PIL import Image, ImageDraw, ImageFilter

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "public", "images")

TERRACOTTA = "#DC4A0C"
DEEP = "#B93A06"
INK = "#241A14"


# --------------------------------------------------------------------------
# SVG assets
# --------------------------------------------------------------------------

LOGO = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 100" role="img" aria-label="Guide Guru Global">
  <g fill="none" stroke="{TERRACOTTA}" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M47 32A19 19 0 1 0 47 56"/>
    <path d="M47 56V45H34"/>
    <path d="M20 63c-7 7-4 17 6 17 6 0 10-3 12-8"/>
  </g>
  <g font-family="Georgia, 'Times New Roman', serif" fill="{TERRACOTTA}" font-weight="700">
    <text x="54" y="47" font-size="39" letter-spacing="0.5">UIDE</text>
    <text x="54" y="83" font-size="39" letter-spacing="0.5">GURU</text>
  </g>
  <text x="56" y="96" font-family="Helvetica, Arial, sans-serif" font-size="10.5"
        letter-spacing="7" fill="#9A8878" font-weight="600">GLOBAL</text>
</svg>
"""


def temple_svg(width: int, height: int, stroke_width: float) -> str:
    """Symmetric shikhara line-art, drawn once and reused at two sizes."""
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 190" width="{width}" height="{height}" aria-hidden="true">
  <g fill="none" stroke="{TERRACOTTA}" stroke-width="{stroke_width}" stroke-linecap="round" stroke-linejoin="round" opacity="0.85">
    <!-- central shikhara -->
    <path d="M120 14c-4 8-6 14-6 20 0 5 3 8 6 8s6-3 6-8c0-6-2-12-6-20z"/>
    <path d="M120 42v-6"/>
    <path d="M96 118c0-30 10-56 24-72 14 16 24 42 24 72z"/>
    <path d="M104 118c0-26 7-48 16-62 9 14 16 36 16 62"/>
    <path d="M112 118v-22a8 8 0 0 1 16 0v22"/>
    <!-- flanking domes -->
    <path d="M60 124c0-20 8-36 18-46 10 10 18 26 18 46z"/>
    <path d="M144 124c0-20 8-36 18-46 10 10 18 26 18 46z"/>
    <path d="M78 68v-8"/><path d="M162 68v-8"/>
    <circle cx="78" cy="56" r="4"/><circle cx="162" cy="56" r="4"/>
    <!-- outer turrets -->
    <path d="M34 132c0-14 5-26 12-33 7 7 12 19 12 33z"/>
    <path d="M182 132c0-14 5-26 12-33 7 7 12 19 12 33z"/>
    <!-- colonnade -->
    <path d="M28 132h184"/>
    <path d="M28 146h184"/>
    <path d="M44 146v-14M64 146v-14M84 146v-14M104 146v-14M120 146v-14M136 146v-14M156 146v-14M176 146v-14M196 146v-14"/>
    <path d="M44 132a10 10 0 0 1 20 0M84 132a10 10 0 0 1 20 0M136 132a10 10 0 0 1 20 0M176 132a10 10 0 0 1 20 0"/>
    <!-- plinth -->
    <path d="M20 146h200v10H20z"/>
    <path d="M14 156h212v8H14z"/>
    <path d="M26 164h188"/>
    <path d="M40 164v8M80 164v8M120 164v8M160 164v8M200 164v8"/>
    <path d="M30 172h180"/>
  </g>
</svg>
"""


# --------------------------------------------------------------------------
# Placeholder photography
# --------------------------------------------------------------------------

PALETTES = {
    "sunrise": [(255, 214, 150), (247, 160, 78), (206, 92, 32), (120, 52, 24)],
    "dusk": [(255, 198, 140), (232, 122, 60), (168, 66, 30), (74, 36, 22)],
    "river": [(255, 226, 176), (243, 150, 78), (176, 78, 40), (58, 40, 34)],
    "interior": [(250, 226, 196), (226, 168, 112), (168, 96, 52), (66, 42, 28)],
    "night": [(246, 190, 132), (206, 118, 60), (128, 58, 30), (40, 26, 20)],
}


def lerp(a, b, t):
    return tuple(int(round(a[i] + (b[i] - a[i]) * t)) for i in range(3))


def gradient(size, palette):
    w, h = size
    img = Image.new("RGB", (1, h))
    px = img.load()
    stops = len(palette) - 1
    for y in range(h):
        t = y / max(h - 1, 1)
        seg = min(int(t * stops), stops - 1)
        local = t * stops - seg
        px[0, y] = lerp(palette[seg], palette[seg + 1], local)
    return img.resize(size, Image.BICUBIC)


def draw_skyline(draw, w, horizon, colour, seed, scale=1.0):
    rng = random.Random(seed)
    x = -20
    while x < w + 20:
        kind = rng.choice(["dome", "spire", "block", "dome"])
        bw = int(rng.randint(28, 70) * scale)
        bh = int(rng.randint(30, 92) * scale)
        top = horizon - bh
        if kind == "dome":
            draw.rectangle([x, top + bh // 3, x + bw, horizon], fill=colour)
            draw.pieslice(
                [x, top, x + bw, top + int(bh * 0.66)], 180, 360, fill=colour
            )
            draw.polygon(
                [
                    (x + bw // 2, top - int(14 * scale)),
                    (x + bw // 2 - int(4 * scale), top),
                    (x + bw // 2 + int(4 * scale), top),
                ],
                fill=colour,
            )
        elif kind == "spire":
            draw.polygon(
                [(x + bw // 2, top - int(20 * scale)), (x, horizon), (x + bw, horizon)],
                fill=colour,
            )
        else:
            draw.rectangle([x, top + bh // 2, x + bw, horizon], fill=colour)
            for i in range(3):
                cx = x + int(bw * (i + 0.5) / 3)
                draw.rectangle(
                    [cx - int(3 * scale), top + bh // 2, cx + int(3 * scale), horizon],
                    fill=colour,
                )
        x += bw + rng.randint(2, 14)


def make_photo(path, size, palette_name, seed, water=True, layers=3):
    w, h = size
    rng = random.Random(seed)
    palette = PALETTES[palette_name]
    img = gradient(size, palette)
    draw = ImageDraw.Draw(img, "RGBA")

    # sun
    sun_x = int(w * rng.uniform(0.3, 0.72))
    sun_y = int(h * rng.uniform(0.22, 0.4))
    for r in range(int(w * 0.42), 0, -6):
        alpha = int(70 * (1 - r / (w * 0.42)) ** 2) + 4
        draw.ellipse(
            [sun_x - r, sun_y - r, sun_x + r, sun_y + r],
            fill=(255, 236, 190, alpha),
        )
    draw.ellipse(
        [sun_x - w // 22, sun_y - w // 22, sun_x + w // 22, sun_y + w // 22],
        fill=(255, 246, 214, 220),
    )

    horizon = int(h * (0.66 if water else 0.86))

    # layered silhouettes, back to front
    for layer in range(layers):
        t = layer / max(layers - 1, 1)
        shade = lerp((196, 118, 66), (58, 32, 22), t)
        draw_skyline(
            draw,
            w,
            horizon - int((layers - 1 - layer) * h * 0.03),
            shade + (255,),
            seed + layer * 17,
            scale=w / 800 * (0.8 + 0.3 * t),
        )

    if water:
        water_top = horizon
        for y in range(water_top, h):
            t = (y - water_top) / max(h - water_top, 1)
            c = lerp(palette[1], palette[3], min(t * 1.3, 1))
            draw.line([(0, y), (w, y)], fill=c + (255,))
        # reflection of the sun
        for i in range(int(h * 0.3)):
            y = water_top + i
            width = int(w * 0.05 * (1 + i / 30))
            if rng.random() < 0.55:
                draw.line(
                    [(sun_x - width // 2, y), (sun_x + width // 2, y)],
                    fill=(255, 226, 170, max(10, 90 - i)),
                )
        # ripples
        for _ in range(int(h * 0.25)):
            y = rng.randint(water_top + 2, h - 2)
            x0 = rng.randint(0, w)
            length = rng.randint(int(w * 0.05), int(w * 0.3))
            draw.line(
                [(x0, y), (x0 + length, y)],
                fill=(255, 220, 170, rng.randint(12, 44)),
            )
        img = img.filter(ImageFilter.GaussianBlur(0.4))
        draw = ImageDraw.Draw(img, "RGBA")

    # ground haze + vignette
    haze = Image.new("RGBA", size, (0, 0, 0, 0))
    hd = ImageDraw.Draw(haze)
    for i in range(60):
        alpha = int(48 * (1 - i / 60))
        hd.line([(0, horizon - 30 + i), (w, horizon - 30 + i)], fill=(255, 214, 160, alpha))
    img = Image.alpha_composite(img.convert("RGBA"), haze).convert("RGB")

    vignette = Image.new("L", size, 0)
    vd = ImageDraw.Draw(vignette)
    vd.ellipse([-w * 0.25, -h * 0.3, w * 1.25, h * 1.3], fill=255)
    vignette = vignette.filter(ImageFilter.GaussianBlur(w * 0.12))
    dark = Image.new("RGB", size, (40, 24, 16))
    img = Image.composite(img, dark, vignette)

    img = img.filter(ImageFilter.SMOOTH)
    img.save(path, "JPEG", quality=82, optimize=True)


EXPERIENCE_IMAGES = [
    ("ram-lala-darshan", "sunrise", 11, False, 4),
    ("hanumangarhi-darshan", "dusk", 23, False, 3),
    ("ayodhya-heritage-walk", "interior", 37, False, 4),
    ("sarayu-aarti-experience", "river", 41, True, 2),
    ("local-crafts-culture", "interior", 53, False, 3),
    ("ayodhya-flavors-food-walk", "night", 67, False, 2),
    ("sarayu-sunrise-boat", "river", 71, True, 2),
    ("kanak-bhawan-story-trail", "sunrise", 83, False, 3),
    ("ramkot-temple-circuit", "dusk", 97, False, 4),
    ("guptar-ghat-morning-walk", "river", 103, True, 3),
    ("bhakti-path-lantern-walk", "night", 109, False, 3),
    ("awadhi-thali-experience", "interior", 127, False, 2),
    ("terracotta-workshop", "interior", 131, False, 2),
    ("ramayana-katha-evening", "night", 149, False, 3),
    ("sarayu-riverfront-cycle", "river", 151, True, 2),
]

TOUCHPOINT_IMAGES = [
    ("evoke-rambagh", "interior", 211, False, 2),
    ("chhoti-devkali", "sunrise", 223, False, 3),
    ("hanumangarhi", "dusk", 227, False, 4),
    ("bhakti-path", "night", 229, False, 3),
    ("ram-janmabhoomi", "sunrise", 233, False, 4),
    ("naya-ghat", "river", 239, True, 3),
    ("sarayu-aarti", "river", 241, True, 2),
    ("kanak-bhawan", "dusk", 251, False, 3),
    ("guptar-ghat", "river", 257, True, 3),
    ("bazaar-lane", "night", 263, False, 2),
    ("terracotta-studio", "interior", 269, False, 2),
    ("brass-workshop", "interior", 271, False, 2),
    ("chaat-corner", "night", 277, False, 2),
]


def main():
    for folder in ("hero", "experiences", "touchpoints", "illustrations", "branding"):
        os.makedirs(os.path.join(ROOT, folder), exist_ok=True)

    with open(os.path.join(ROOT, "branding", "logo.svg"), "w") as handle:
        handle.write(LOGO)
    with open(os.path.join(ROOT, "illustrations", "temple-lineart.svg"), "w") as handle:
        handle.write(temple_svg(240, 190, 2.1))
    with open(os.path.join(ROOT, "illustrations", "temple-mini.svg"), "w") as handle:
        handle.write(temple_svg(150, 119, 2.6))

    make_photo(os.path.join(ROOT, "hero", "ayodhya-sarayu-ghat.jpg"), (900, 1200), "river", 7, True, 4)

    for slug, palette, seed, water, layers in EXPERIENCE_IMAGES:
        make_photo(
            os.path.join(ROOT, "experiences", f"{slug}.jpg"),
            (800, 600),
            palette,
            seed,
            water,
            layers,
        )

    for slug, palette, seed, water, layers in TOUCHPOINT_IMAGES:
        make_photo(
            os.path.join(ROOT, "touchpoints", f"{slug}.jpg"),
            (800, 600),
            palette,
            seed,
            water,
            layers,
        )

    print("assets written to", os.path.normpath(ROOT))


if __name__ == "__main__":
    main()
