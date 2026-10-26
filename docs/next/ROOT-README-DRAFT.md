# Proposed README documentation-index update (NOT APPLIED)

This is an additive staging artifact. The repository's existing `README.md` is **unchanged**. After the [comparison audit](audit/source-crosswalk.md), the root README can be revised to retain its current run/build/test instructions and add the index below.

## Documentation index to add to the root README

| Topic | Location |
| --- | --- |
| Documentation overview and implementation status | [docs/next/README.md](README.md) |
| Environmental sandbox rules | [Environment](systems/environment.md) |
| Plant progression, output and harvesting | [Plant lifecycle](systems/plant-lifecycle.md) |
| Fungal lifecycles and source mechanics | [Fungus lifecycle](systems/fungus-lifecycle.md) |
| 31 approved Fungi | [Fungal roster](fungi/README.md) |
| Six Plant families and their 69 recipes | [Plant family index](README.md#plant-families) |
| Transformations and simulation event order | [Transformations](systems/transformations.md), [Simulation and time](systems/simulation-and-time.md) |
| Superseded ideas and original sources | [History](history/README.md) |

**Current development status:** Prototype 1 implements the environmental sandbox only. Plant/Fungus/Mycelial lifecycle and Transformation rules are approved first-pass designs, not implemented runtime features.

Do not overwrite existing README content or installation/deployment instructions during the final migration; integrate this index into those existing sections only after review.
