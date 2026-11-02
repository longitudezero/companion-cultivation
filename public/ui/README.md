# Supplied interface artwork

User-supplied artwork, 1 November 2026. PNG/WebP bytes are copied unchanged from the attached assets. `src/ui/GameArt.jsx` uses SVG view boxes to normalize their visible bounds and select badges/corners from the two collections without altering the originals.

- `temperature-warm.webp` uses the supplied orange `hot_512.webp`; `temperature-hot.webp` uses the red `scorching_512.webp`. The game retains its five existing Temperature states.
- The four Illumination icons map to Dark, Dim, Lit and Bright.
- The expansion icons are available artwork; this presentation pass does not add expansion rewards or products.
- Fungus rewards keep their individual species illustrations.
- Moisture uses the supplied Dry, Damp and Flooded droplets. The supplied Leaf, warning and pin icons are also copied unchanged.
- Taskboard corners select six distinct designs from the original sheet. Complete task uses the bottom-right botanical badge.
- `ivy-top-left.png` and `ivy-bottom-left.png` are the two supplied transparent ivy corners, copied without changing their pixels. `GoldVines.jsx` applies a pale-gold tonal filter at render time, retaining their alpha and shading. Other supplied sheets retain visible background haze, so these two transparent variants are used for the faint watermarks.
- `ivy-right.webp` uses the replacement supplied right vine, with its 600 × 363 bounds and the same gold treatment. Speed Pause/0.5×/1×/2× icons and the Bag/1–4 numeral images are copied unchanged. The latest supplied `2x(1).webp` is used for `speed-double.webp`.
- The supplied Plus, Minus and Fit icons are used unchanged for zoom and the Shop/planting quantity controls. Crop view boxes normalize their visible frames, as with the speed artwork.

- `garden-clearing.png` is the supplied `Mossy Subterranean Garden Clearing2.png` (1672 × 941), copied byte-for-byte. The camera viewport displays it behind the existing 22px dot pattern; pan and zoom move the hex world independently.

- `title-decoration.webp` is the supplied title ornament, copied unchanged. Task section headings display its complete canvas at its original aspect ratio, including the long top arm and short lower arm; the title background keeps rounded capsule ends and the existing slow green wisps.

- `taskboard-noticeboard.webp` is the supplied Enchanted Forest Scholar’s Noticeboard, copied unchanged (2048 × 592). It sits behind the Taskboard title, controls and floating dust. The Shop keeps its existing vine header.

`rewards-expand.webp` is the supplied Ornate Forest Green Expand Button, copied unchanged (314×314). Its GameArt view box removes transparent margins without repainting the asset. Only the icon rotates between the Rewards disclosure states.


`fantasy-corners.png` is the supplied Ornate Gilded Fantasy Corner Ornament Atlas, copied unchanged (1536×1024). GameArt view boxes select plain bellflower, ivy and flower corners; the two atlas variants containing painted Back buttons are not used.

`florals/` contains the four supplied botanical WebPs, copied unchanged as `paw-left`, `clover-right`, `violets-left` and `wildflowers-right`. Matching `-faded.svg` backgrounds embed the original WebP bytes at 42% opacity in their full original canvas. These self-contained wrappers allow opacity without affecting text or introducing overlay layers, while preserving every source pixel and all leaf tips.
