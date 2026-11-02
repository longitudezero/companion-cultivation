import test from 'node:test';
import assert from 'node:assert/strict';
import { CONDITIONS, createGarden, makePlant, makeAnchoredSource, migrateGarden,
  calculateEnvironment, serializeGameSave, deserializeGameSave } from '../src/core/index.js';

test('V6 and V7 temperature migration preserves baselines, anchors, heat clocks and witnessed knowledge', () => {
  for (const schemaVersion of [6, 7]) {
    const old = createGarden(3, 3);
    old.schemaVersion = schemaVersion;
    old.hexes['0,0'].baselines.Temperature = 'Warm';
    old.hexes['1,0'].baselines.Temperature = 'Hot';
    old.objects['0,0'] = { ...makePlant('Aloechemist'), progress: 81, exposure: { Dry: 0, Hot: 35, Freezing: 0, Mycelial: 0 } };
    old.objects['2,0'] = { ...makeAnchoredSource(), anchor: { property: 'Temperature', condition: 'Hot' } };
    old.grimoire = { plants: { Aloechemist: true }, environments: { Aloechemist: {
      warm: { property: 'Temperature', condition: 'Warm', signal: 'favourable' },
      hot: { property: 'Temperature', condition: 'Hot', signal: 'reduced' },
    } }, hazards: { Aloechemist: { heat: { hazard: 'Hot', outcome: 'penalty' } } },
    fungalEffects: { Aloechemist: { heat: { fungus: 'Emberbolete', kind: 'environment:Temperature', direction: 0, result: 'Hot' } } },
    transformations: [{ from: 'Aloechemist', into: 'Cactastrophe', conditions: { Temperature: 'Warm' },
      fungi: ['Rilllace'], hours: 36, observedAt: 50 }] };
    const before = structuredClone(old), current = migrateGarden(old);
    assert.deepEqual(old, before, 'migration leaves the old file untouched');
    assert.equal(current.schemaVersion, 8);
    assert.equal(current.hexes['0,0'].baselines.Temperature, 'Hot');
    assert.equal(current.hexes['1,0'].baselines.Temperature, 'Scorching');
    assert.equal(current.objects['2,0'].anchor.condition, 'Scorching');
    assert.equal(calculateEnvironment(current).conditions['2,0'].Temperature, 'Scorching');
    assert.equal(current.objects['0,0'].exposure.Scorching, 35);
    assert.equal(current.objects['0,0'].progress, 81);
    assert.equal(current.grimoire.environments.Aloechemist['Temperature:Hot'].signal, 'favourable');
    assert.equal(current.grimoire.environments.Aloechemist['Temperature:Scorching'].signal, 'reduced');
    assert.equal(current.grimoire.hazards.Aloechemist['Scorching:penalty'].hazard, 'Scorching');
    assert.equal(Object.values(current.grimoire.fungalEffects.Aloechemist)[0].result, 'Scorching');
    assert.equal(current.grimoire.transformations[0].conditions.Temperature, 'Hot');
    assert.deepEqual(migrateGarden(current), current, 'a new Hot never shifts to Scorching on later loads');
    assert.deepEqual(deserializeGameSave(serializeGameSave(current)), current);
  }
});

test('V8 Hot and Scorching retain their separate positions and exposure clocks through backup import', () => {
  assert.deepEqual(CONDITIONS.Temperature, ['Freezing', 'Cold', 'Temperate', 'Hot', 'Scorching']);
  const garden = createGarden(3, 3);
  garden.hexes['0,0'].baselines.Temperature = 'Hot';
  garden.hexes['1,0'].baselines.Temperature = 'Scorching';
  garden.objects['1,0'] = { ...makePlant('Aloechemist'), exposure: { Dry: 0, Scorching: 17, Freezing: 0, Mycelial: 0 } };
  const restored = deserializeGameSave(serializeGameSave(garden));
  assert.equal(restored.hexes['0,0'].baselines.Temperature, 'Hot');
  assert.equal(restored.hexes['1,0'].baselines.Temperature, 'Scorching');
  assert.equal(restored.objects['1,0'].exposure.Scorching, 17);
});
