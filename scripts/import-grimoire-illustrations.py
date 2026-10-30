"""Import the user-supplied species artwork without changing the source archive.

Usage: python scripts/import-grimoire-illustrations.py /path/to/illustrations.zip
Requires Pillow and Node. Produces contained, uncropped WebP plates plus provenance.
"""

import argparse
import hashlib
import io
import json
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
import re
import subprocess
import zipfile

from PIL import Image, __version__ as pillow_version


ROOT = Path(__file__).resolve().parents[1]
FOLDERS = {
    'Ingredients': 'ingredients-illustration-collection',
    'Flowers': 'flower-illustration-study',
    'Aquatic': 'aquatic-illustration-collection',
    'Desert': 'desert-illustration-collection',
    'Spices': 'spices-illustration-collection',
}
ALIASES = {
    'Moss': 'woodlands/Primordial Velvet Moss-14.png',
    'Bamboom': 'woodlands/Saffron-gold bamboo bloom-13.png',
    'Bamboozeling': 'woodlands/Bamboozeling_ Enchanted Bamboo Shoots-15.png',
    'Bamboozled': 'woodlands/Bamboozled.png',
    'Tanglethorn': 'woodlands/Tanglethorn_ Thornwoven Forest Bramble-17.png',
    'Mistlefoe': 'woodlands/Thorned Mistletoe of the Wildwood-16.png',
    'Mistlewoe': 'woodlands/Weeping Sapphire Mistlewoe-21.png',
    'Bramblewraith': 'woodlands/Bramblewraith_ Ghost Thorn Botanical-20.png',
    'Mandrabra': 'woodlands/Mandabra_ Enchanted Woodland Root-19.png',
    'Mandrakadabra': 'woodlands/Mandrakadabra_ goldenroot mandrake bloom-23.png',
    'Mandrakazam': 'woodlands/Mandrazam_ Opaline Mandrake Bloom-22.png',
    'Prickly Pearl': 'desert-illustration-collection/prickly-pearil.png',
    'Mycelord': 'fungi-illustration-collection/Mycelord_ Majestic Corrupted Fungus-1.png',
    'Dewmender': 'fungi-illustration-collection/Luminous Dewmender Fungus-2.png',
    'Mistruffle': 'fungi-illustration-collection/Mistruffle, the Enchanted Truffle Cluster.png',
    'Emberbolete': 'fungi-illustration-collection/Emberbolete, the emberlit rustcap fungus.png',
    'Rilllace': 'fungi-illustration-collection/Rilllace_ Waterfall Veils of Blue-4.png',
    'Prismorel': 'fungi-illustration-collection/Prismatic Morel Fungus Cluster-6.png',
    'Droughtcap': 'fungi-illustration-collection/Sunbaked Droughtcap Cluster-5.png',
    'Hushroom': 'fungi-illustration-collection/Hushroom_ Midnight velvet fungus-8.png',
    'Rainmorel': 'fungi-illustration-collection/Rainmorel_ Luminous honeycomb mushroom cluster-9.png',
    'Siltgill': 'fungi-illustration-collection/Siltgill Riverbed Fungus Specimen-7.png',
    'Rushroom': 'fungi-illustration-collection/Kinetic Rushroom fantasy fungus-10.png',
    'Frostfolio': 'fungi-illustration-collection/Frostfolio, the Frozen Folio Fungus-11.png',
    "Sim'mushro'dim": "fungi-illustration-collection/Sim'mushro'dim, the Arcane Spiral Fungus-12.png",
}


def slug(name):
    return re.sub(r'[^a-z0-9]+', '-', name.lower()).strip('-')


def sha(data):
    return hashlib.sha256(data).hexdigest()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('archive', type=Path)
    args = parser.parse_args()
    catalogue = json.loads(subprocess.check_output([
        'node', '--input-type=module', '-e',
        "import {PLANTS,FUNGI} from './src/core/species.js';"
        "console.log(JSON.stringify([...Object.entries(PLANTS).map(([species,p])=>({species,kind:'plant',family:p.family})),"
        "...Object.keys(FUNGI).map(species=>({species,kind:'fungus',family:'Fungi'}))]));",
    ], cwd=ROOT, text=True))
    output = ROOT / 'public/grimoire/illustrations'
    jobs = []
    with zipfile.ZipFile(args.archive) as archive:
        for entry in catalogue:
            source = ALIASES.get(entry['species']) or f"{FOLDERS[entry['family']]}/{slug(entry['species'])}.png"
            jobs.append((entry, source, archive.read(source)))
        used = {source for _, source, _ in jobs}
        unused = sorted(name for name in archive.namelist() if name.lower().endswith('.png') and name not in used)
    if len(used) != len(jobs):
        raise ValueError('Two catalogue entries were assigned the same source image')

    def convert(job):
        entry, source, data = job
        file = f"{'fungi' if entry['kind'] == 'fungus' else 'plants'}/{slug(entry['species'])}.webp"
        destination = output / file
        destination.parent.mkdir(parents=True, exist_ok=True)
        with Image.open(io.BytesIO(data)) as image:
            original_size = list(image.size)
            image = image.convert('RGBA')
            image.thumbnail((768, 768), Image.Resampling.LANCZOS)
            image.save(destination, 'WEBP', quality=88, method=6, exact=True)
        with Image.open(destination) as decoded:
            decoded.load()
            size = list(decoded.size)
            transparent = decoded.mode == 'RGBA' and decoded.getchannel('A').getextrema()[0] < 255
            if decoded.format != 'WEBP' or max(size) > 768:
                raise ValueError(f'Invalid output: {file}')
        result = destination.read_bytes()
        return {**entry, 'file': file, 'source': source, 'sourceSha256': sha(data),
                'sourceDimensions': original_size, 'dimensions': size, 'transparent': transparent,
                'sha256': sha(result), 'bytes': len(result)}

    with ThreadPoolExecutor(max_workers=4) as pool:
        records = list(pool.map(convert, jobs))
    manifest = {
        'sourceArchive': args.archive.name, 'sourceArchiveSha256': sha(args.archive.read_bytes()),
        'source': 'User-supplied artwork, imported at the user’s direction.',
        'processing': {'format': 'WebP', 'maxEdge': 768, 'quality': 88, 'method': 6,
                       'resize': 'Contain without cropping or upscaling; preserve alpha and artwork.',
                       'pillowVersion': pillow_version},
        'illustrations': records,
        'unused': [{'source': source, 'reason': 'Not in the current species catalogue'} for source in unused],
    }
    (output / 'manifest.json').write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + '\n')
    runtime = {record['species']: {'asset': f"illustrations/{record['file'][:-5]}",
                'width': record['dimensions'][0], 'height': record['dimensions'][1]} for record in records}
    (ROOT / 'src/grimoire/illustrations.js').write_text(
        "// Generated by scripts/import-grimoire-illustrations.py from the supplied archive.\n"
        "import { art } from './art.js';\n\n"
        'export const SPECIES_ILLUSTRATIONS = Object.freeze(' + json.dumps(runtime, indent=2, ensure_ascii=False) + ');\n\n'
        'export function illustrationFor(species) {\n'
        '  const illustration = SPECIES_ILLUSTRATIONS[species];\n'
        '  return illustration ? { ...illustration, src: art(illustration.asset) } : null;\n}\n')
    total = sum(record['bytes'] for record in records)
    print(f'Imported {len(records)} catalogue illustrations ({total / 1024 / 1024:.1f} MiB).')
    print('Unused archive images:', ', '.join(unused) or 'none')


if __name__ == '__main__':
    main()
