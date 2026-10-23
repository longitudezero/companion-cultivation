import { build } from 'esbuild';

await build({
  entryPoints: ['src/core/index.js'],
  outfile: 'dist-core/index.cjs',
  bundle: true,
  platform: 'node',
  format: 'cjs',
  target: 'node18',
  sourcemap: true,
});

console.log('CommonJS cultivation core built at dist-core/index.cjs');
