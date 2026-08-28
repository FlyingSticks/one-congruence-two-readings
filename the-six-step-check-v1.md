# The Six-Step Check — v1 · executed

> **Provenance.** Executed 18 August 2026. The original files did not
> survive the iPad; this copy and `sixstep2.js` were reconstructed on
> 28 August 2026 from the session record, source identical to the
> executed version, and re-run: every figure below reproduces
> (transport 1/ν at 1.3–2.2e−16 on and off seam; single-channel
> off-seam best error 0.63; swap-variant best error 0.25; per-line
> spread 3.5–8; trace constants to 1e−15). A pass/fail tally of 22
> assertions was appended to the script on reconstruction so the
> verdict is re-runnable: `node sixstep2.js` → 22/22.

*Conjecture under test (8.5′d): cross-slit on K = δ∘(glide on δK)∘δ up
to one fixed S₃ element (candidate: the seam relation ρτ = ω); fusion
locus = self-dual configurations. Protocol: anchor quadric with slits
mutually polar + PP↔SP swap; Plücker duality; compare gauge scalars
on/off seam; falsifiers. Machinery and numbers in `sixstep2.js`.*

## Verdict

**PASSED, in amended form.** The fixed element is ρ (the Reciprocal),
exactly as the ρτ = ω candidate predicted — but it arrives composed
with the channel swap, and it arrives only for one anchor. Both
amendments sharpen rather than weaken the conjecture. One bug in the
first machinery was caught and is reported (§S3 note), and one
falsifier fired usefully (the swap-variant anchor).

## The rig

Picture plane z = 0; u-slit {(0,t,Z₁)}, v-slit {(s,0,Z₂)};
Z₁ = −1/r_u, Z₂ = −1/r_v; scene at z > 0. Anchor family derived from
the mutual-polarity conditions: a₁₂ = a₁₃ = a₁₄ = a₂₃ = a₂₄ = 0,
a₄₄ = −Z₁Z₂ − a₃₄(Z₁+Z₂); free a₁₁, a₂₂, a₃₄.

## S1 — anchor quadric [exact]

Mutual polarity of the slits: residual 0 across the family. With
a₃₄ = 0, a₁₁ = a₂₂ = 1 the anchor is the **sphere x² + y² + z² = Z₁Z₂:
center at the principal point, radius the geometric mean of the slit
depths.** Its poles pair {picture plane ↔ depth point at infinity} and
{plane at infinity ↔ principal point}. The protocol's "PP↔SP swap" is
realized in this paired form; forcing a finite pole of PP instead
(a₃₄ ≠ 0) is tested in S4 and **fails** — see amendments.

## S2 — Plücker self-duality [exact]

The polar of every sampled congruence line is a congruence line,
residual 0, on and off the seam, all anchors. Cross-slit congruences
are a self-dual class, confirmed at machine precision.

## S3 — depth transport [derived exactly, then confirmed]

*Bug and repair:* the polarity sends every point of ℓ to a plane
containing ℓ*, so "the conjugate point" is degenerate — the whole line.
The induced transport must be read through a section of the
plane-pencil. Canonical section: the depth axis, which is the common
perpendicular of the two slits through the principal point (the ghost
normal) — not a choice, the rig's own invariant line.

Through that section the transport has closed form
**z† = Z₁Z₂ / z** — an involution, fixed points at z = ±√(Z₁Z₂), the
two points where the anchor sphere crosses the axis. Confirmed
line-independent to spread 0.0 across all samples: one global map, not
a per-line family. (The per-line conjugacy, by contrast, is genuinely
line-dependent — spread 3.5–8 — so the fixed-element claim lives at
the depth-pencil level, consistent with the earlier obstruction
finding, and a pointwise-per-line version of 8.5′d is **false**.)

## S4 — the element [exact where it should be, failing where it should]

In the geometric-mean calibration ν = z/√(Z₁Z₂): the transport is
**1/ν to 1.3e−16**, on and off the seam. In a single-channel
calibration off-seam (ν = z/Z₁): *no* S₃ element fits (best error
0.63) — correctly so. In the **cross-channel** calibrations:
ν_u → ν_v† and ν_v → ν_u† are both exactly 1/ν (2e−16). Reading:

  **δ acts on calibrated depth as (channel swap) ∘ ρ.**

The swap is forced, not optional: mutually polar slits means δ
exchanges the slits, hence the channels. And since ρτ = ω, conjugating
the glide reading (τ per channel) by δ yields the cross-slit reading
(ω per channel) up to the single fixed element ρ — the conjecture's
candidate, confirmed.

The swap-variant anchor (a₃₄ = 1, finite pole of PP): **no S₃ element
in any tested calibration** (best 0.25). The falsifier fired where it
should: anharmonicity of the transport *selects* the geometric-mean
sphere as the canonical anchor. §8.3′'s "canonical anchor ⇔ marked
conic" now has its conic named: the mirror-sphere R² = Z₁Z₂ — the
VM·VI = VP² grammar at anchor level.

## S5 — gauge scalars and traces on/off seam

Cross-channel gauge identity **ν_u · ν_v† = 1 at 1e−16**, on and off
seam (sphere anchor); fails (1.3) for the swap variant, as predicted.

Trace transport: δ maps the picture trace of a congruence line by a
**per-channel inversion**, X·X* and Y·Y* constant to 1e−16 across all
lines, with closed forms X·X* = Z₁²Z₂ / (a₁₁(Z₁−Z₂)) and
Y·Y* = −Z₁Z₂² / (a₂₂(Z₁−Z₂)) (verified against both rate pairs). Two
mirror circles, one per channel, radii in ratio −Z₁/Z₂. **On the seam
these constants diverge, structurally:** there δ sends the pinhole
pencil to the line field of the slit plane — rays through the eye
exchange with lines in a plane. Collection exchanges with evaluation.
The seam is where the trace-level duality stops being an inversion and
becomes the vector↔covector swap itself.

## S6 — consequences and standing

- 8.5′d: **confirmed as amended** — up to ρ *and the apparatus swap*,
  for the canonical (geometric-mean sphere) anchor, at the
  depth-pencil level, in the interior of the rate square.
- Seam Theorem §6: the conditional discharges on the tested domain —
  R-invariance = δ-invariance there, so **fused locus = self-dual
  locus** with equation Δ, for the interior and the diagonal.
- Grading: z† = Z₁Z₂/z, the S4 identifications, and the trace constants
  are two-line algebra confirmed numerically — proof-grade. The
  sampling (12 lines × 5 depths × 4 anchors × 3 rate pairs) supports
  but does not replace a symbolic pass.

## Caveats, honestly

1. The r = 0 edges are **not covered**: a slit at infinity sends the
   anchor radius to infinity and the polarity degenerates. The edge
   half of the fused locus needs its own limit argument.
2. The section choice (depth axis) is canonical for this rig; a rig
   without the common-perpendicular symmetry would reopen the question.
3. "One fixed element" survives only with the swap granted as apparatus
   symmetry. If the swap is charged against the conjecture, the honest
   statement is "one fixed element per swap-coset."
