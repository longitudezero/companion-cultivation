import test from 'node:test';
import assert from 'node:assert/strict';
import { createGrimoire } from '../src/core/grimoire.js';
import { PLANTS, FUNGI } from '../src/core/species.js';
import { TRANSFORMATIONS } from '../src/core/transformations.js';
import { visibleGrimoirePlants, totalRecipes, previewPlantConditions, previewPlantHazards,
  previewPlantCompatibility, previewPlantRecipes, previewFungusProfile, previewFungusEffects,
  previewFungusRecipes, describeFullRecipe } from '../src/core/grimoire-preview.js';

test('developer Grimoire exposes all species without unlocking anything in a normal garden', () => {
  const ledger = createGrimoire();
  const before = JSON.stringify(ledger);
  assert.equal(visibleGrimoirePlants(ledger).length, 6);
  assert.equal(visibleGrimoirePlants(ledger, true).length, 60);
  assert.equal(Object.keys(FUNGI).length, 13);
  assert.equal(Object.keys(PLANTS).length, 60);
  assert.equal(totalRecipes(), 69);
  assert.equal(JSON.stringify(ledger), before);
  assert.equal(ledger.transformations.length, 0);
  assert.equal(visibleGrimoirePlants(ledger).length, 6);
});

test('every developer Plant and Fungus page comes from a complete canonical definition', () => {
  for (const name of Object.keys(PLANTS)) {
    assert.ok(previewPlantConditions(name).length >= 3, name);
    assert.ok(previewPlantCompatibility(name).length > 0, name);
    assert.ok(Array.isArray(previewPlantHazards(name)), name);
    const related = Object.entries(TRANSFORMATIONS).reduce((count, [from, recipes]) =>
      count + recipes.filter(recipe => from === name || recipe.into === name).length, 0);
    assert.equal(previewPlantRecipes(name).length, related, name);
  }
  for (const name of Object.keys(FUNGI)) {
    assert.ok(previewFungusProfile(name).length > 0, name);
    assert.ok(Array.isArray(previewFungusEffects(name)), name);
    assert.ok(Array.isArray(previewFungusRecipes(name)), name);
  }
});

test('recipe references include named contacts, resolved conditions and multi-step exceptions', () => {
  const pumpkin = previewPlantRecipes('Beanstalk').find(line => line.includes('Pumpkin'));
  assert.match(pumpkin, /Temperature: Warm/);
  assert.match(pumpkin, /Emberbolete/);
  assert.match(pumpkin, /Hold for 2m/);
  assert.doesNotMatch(pumpkin, /emission.*\+1/i);

  const mistlefoe = previewPlantRecipes('Mistlefoe').find(line => line.includes('Mandrabra'));
  assert.match(mistlefoe, /lose Mistruffle contact/);
  assert.match(mistlefoe, /retaining Dewmender/);
  assert.match(mistlefoe, /under 1m 40s/);
  assert.ok(previewFungusRecipes('Mistruffle').some(line => line === mistlefoe));

  const pearlily = previewPlantRecipes('Cresscent').find(line => line.includes('Pearlily'));
  assert.match(pearlily, /Sim'mushro'dim/);
  assert.match(pearlily, /Moisture: Damp/);
  assert.ok(previewPlantRecipes('Pearlily').includes(pearlily), 'result pages include incoming recipes');

  const starlotus = previewPlantRecipes('Moonlit Lotus').find(line => line.includes('Starlotus'));
  assert.match(starlotus, /Flooded to Damp/);
  assert.match(starlotus, /Rainmorel/);

  const ashenRose = previewPlantRecipes('Aloechemist').find(line => line.includes('Cactastrophe'));
  assert.match(ashenRose, /under 3m/);
  assert.match(ashenRose, /Rilllace/);
});

test('every canonical recipe renders to a meaningful developer reference line', () => {
  const all = Object.entries(TRANSFORMATIONS).flatMap(([from, recipes]) =>
    recipes.map(recipe => describeFullRecipe(from, recipe)));
  assert.equal(all.length, 69);
  assert.ok(all.every(line => line.includes('→') && line.length > 35));
  assert.ok(previewFungusProfile('Dewmender').some(line => line.includes('Waterborne')));
  assert.ok(previewFungusEffects('Dewmender').some(line => line.includes('Germination chance')));
});
