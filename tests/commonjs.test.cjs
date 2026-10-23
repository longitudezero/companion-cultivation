const test = require('node:test');
const assert = require('node:assert/strict');
const core = require('../dist-core/index.cjs');

test('CommonJS RPG backend can require the shared cultivation rules', () => {
  const garden = core.createDemoGarden();
  const result = core.calculateEnvironment(garden);
  assert.equal(Object.keys(result.conditions).length, 63);
  assert.equal(typeof core.edgeKey, 'function');
});
