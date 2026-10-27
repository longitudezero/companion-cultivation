import test from 'node:test';
import assert from 'node:assert/strict';
import { PLAYER_TOOLS, DEVELOPER_TOOLS, isDeveloperTool, toolForVisibility } from '../src/tool-catalog.js';

test('ordinary garden actions are restricted to inspection and resource-backed sowing', () => {
  assert.deepEqual(PLAYER_TOOLS.map((item) => item.id), ['inspect', 'sow-plant', 'sow-fungus']);
  assert.ok(PLAYER_TOOLS.every((item) => !isDeveloperTool(item.id)));
});

test('all unrestricted placement, blocker and deletion tools are developer-only', () => {
  assert.deepEqual(DEVELOPER_TOOLS.map((item) => item.id), [
    'plant', 'fungus', 'source', 'hex', 'edge', 'erase',
  ]);
  assert.ok(DEVELOPER_TOOLS.every((item) => isDeveloperTool(item.id)));
  assert.equal(new Set([...PLAYER_TOOLS, ...DEVELOPER_TOOLS].map((item) => item.id)).size, 9);
});

test('hiding developer tools returns their active placement mode to Inspect', () => {
  for (const item of DEVELOPER_TOOLS) {
    assert.equal(toolForVisibility(item.id, false), 'inspect');
    assert.equal(toolForVisibility(item.id, true), item.id);
  }
  for (const item of PLAYER_TOOLS) {
    assert.equal(toolForVisibility(item.id, false), item.id);
  }
});
