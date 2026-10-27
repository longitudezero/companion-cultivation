# Historical root README index proposal (staging snapshot)

**Historical only:** This is the earlier proposed index, preserved as an editorial artifact. The actual root README now points to `docs/design/`. The snippet below intentionally retains its old `docs/next/` staging paths and must not be copied into the live README.

This was an **additive staging artifact**. The repository's root `README.md` and its setup, run, build and test instructions are **unchanged**. Only after the original-versus-new comparison and user review should the root README receive a new navigational section.

The snippet below is **copy-ready for the repository root**, with root-relative destinations. These deliberately differ from links written *inside* `docs/next/`.

## Suggested addition to the root README

```markdown
## Game-design documentation

The reorganized Companion Cultivation design references are under `docs/next/`
while the preservation audit is underway. The original documents remain available
and unchanged for comparison.

| Topic | Documentation |
| --- | --- |
| Overview, scope and implemented-vs-designed status | [Documentation index](docs/next/README.md) |
| Environmental sandbox and influence propagation | [Environment](docs/next/systems/environment.md) · [Influences](docs/next/systems/influences-and-responses.md) |
| Plant progression, timed output and harvesting | [Plant lifecycle](docs/next/systems/plant-lifecycle.md) · [Seeds and harvesting](docs/next/systems/seeds-spores-and-harvesting.md) |
| Fungi, habitats and Mycelial | [Fungus lifecycle](docs/next/systems/fungus-lifecycle.md) · [Mycelial](docs/next/systems/mycelial.md) |
| Full roster of 31 Fungi | [Fungi index](docs/next/fungi/README.md) · [Parameter matrix](docs/next/fungi/roster-matrix.md) |
| Six Plant families and 69 approved first-pass recipes | [Plant-family index](docs/next/README.md#plant-families) · [Transformation rules](docs/next/systems/transformations.md) |
| Time-driven resolution order | [Simulation and time](docs/next/systems/simulation-and-time.md) |
| Superseded concepts and source-to-topic audit | [Historical material](docs/next/history/README.md) · [Source crosswalk](docs/next/audit/source-crosswalk.md) |
```

**Current implementation status:** Prototype 1 implements the environmental sandbox. The Plant/Fungus/Mycelial lifecycles and Transformation system are approved first-pass *designs*, not implemented game features.

**Migration gate:** Do **not** paste or replace any part of the root README before the user has compared the new documents with the originals. When approved, integrate the index without removing existing usage instructions. The links in the fenced Markdown snippet point to the staged files; they can be revised to the final locations if the staging directory is renamed during publication.

For convenient browsing **from this draft's location**, start at the [staging documentation index](README.md), [31-species matrix](fungi/roster-matrix.md) or [current comparison report](audit/current-vs-original.md).
