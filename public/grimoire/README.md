# Grimoire artwork

The botanical borders, gold corners, leather tabs, icons, atlas plaque, enchanted seeds, closed-book illustration and game logo were supplied for this project through the approved Grimoire design work. WebP copies preserve transparent backgrounds; the logo, launcher and seed illustration are resized for their UI uses.

`fonts/NotoSansRunic-Regular.ttf` comes from the official [Google Fonts Noto Sans Runic directory](https://github.com/google/fonts/tree/main/ofl/notosansrunic). The font's SIL Open Font License and copyright notice are included in `fonts/OFL.txt`. The font is hosted with the game so rune rendering does not require a third-party font request.

## Species illustrations

`illustrations/` contains the supplied art for all 60 Plants and 13 Fungi. The original archive is `illustrations(1).zip`; the game uses contained WebP copies with a maximum edge of 768 pixels, preserved aspect ratios and alpha, and no cropping. The complete source filename, source and output hashes, output dimensions and conversion settings are recorded in `illustrations/manifest.json`. Rebuild the copies with `python scripts/import-grimoire-illustrations.py /path/to/illustrations.zip` (Pillow and Node required).

The runtime map is generated in `src/grimoire/illustrations.js`. Only identified entries render their species art; unknown Plants keep the enchanted-seed placeholder. Developer preview can show the complete art without writing discoveries. Authored species descriptions remain separate future content.

The source names `Mandabra`, `Mandrazam` and `Prickly Pearil` map to the current `Mandrabra`, `Mandrakazam` and `Prickly Pearl` entries. Other descriptive Woodlands/Fungi filenames are mapped explicitly by the importer. `Bamboozled.png` is an opaque bamboo-sword scene and is preserved as supplied. The extra Cocoa image is not imported because Cocoa is outside the current catalogue. The source archive is not modified or bundled with the game.

- `icons/transformation-sprout.webp`: user-supplied Hand-Painted Fantasy Sprout Icon (31 October 2026), exported with transparency and resized to 188 × 192 px for the 56 px inspector ornament. The original uploaded illustration is unchanged.
