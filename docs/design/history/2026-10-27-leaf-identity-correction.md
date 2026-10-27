# Historical interpretation corrected: universal Leaves

**Superseded on 27 October 2026** by the user's direct clarification. The newer [current species-specific Leaf rule](../decisions/species-specific-leaves.md) governs implementation.

## Former understanding

Earlier design discussions and the first ten playable prototypes treated all non-Seed output as a **single generic "Leaves" inventory total**. That reading became visible in the runtime as `inventory.leaves: number`, a pooled counter for harvested Plants across all six families. Some preserved first-pass design pages describe Leaves as the universal non-Seed resource or a temporary generic output name; e.g. the Ingredients sections and shared Plant-economy rules.

## Correction and scope

The user clarified that **each Plant was intended to produce its own Leaves** from the beginning. The single inventory counter was a miscommunication, not a desired global game economy. From this decision onward, each harvest must preserve its producing Plant's Leaf species identity. Existing Seed identities, ordinary numeric yields, fungal effects, Allocation and lifecycle mechanics were not rescinded by this correction.

The original large design source, detailed family profiles, prior handoff and earlier audit files are deliberately retained **without textual edits**. These statements remain readable as history, not current Leaf-item authority. Previous saves cannot recover the lost provenance of a pooled total, so that stock remains visible as unattributed legacy inventory rather than being silently reassigned.
