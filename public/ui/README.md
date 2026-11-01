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
