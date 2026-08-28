# The Seam Theorem — v1.1 (three dents repaired)

> **Provenance.** Written 18 August 2026. The original files did not
> survive the iPad; this copy, `verify_seam_v1_1.js`, and the v1 pair
> (`the-seam-theorem-v1.md`, `verify_seam.js`) were recovered verbatim
> from the session record on 28 August 2026 and re-run: 9/9 and 6/6,
> every recorded figure reproducing (curvature identity to 8.0e−9;
> tangency to 1.6e−10; bow/|Δ| 0.1833 vs 0.1836).

*Changes from v1: fusion is now defined (D0.1) instead of assumed; §4 is
repriced from "forced" to "locus forced, order checked"; §5's wording on
the edges is corrected. One new remark (the axis rulings) fell out of
pinning the definition. New checks in `verify_seam_v1_1.js` (6/6);
v1 checks in `verify_seam.js` (9/9) still stand.*

## 0 · Setup (unchanged)

Gauges g_i(λ) = 1 + r_i λ per channel (engine convention 1 − r_i λ
flips one sign in Lemma 2, nothing else). Edge reading
img₁ = (x·g_u, y·g_v); ray reading img₂ = (x/g_u, y/g_v); so
img₂ = R(img₁) channelwise, R the Reciprocal. Seam cubic
Δ = r_u r_v (r_v − r_u); seam = {Δ = 0} = diagonal ∪ two r = 0 edges —
three concurrent lines through the orthographic corner.

## 0.1 · Definition (fusion) — NEW

Fix (r_u, r_v). For each picture-plane point (x, y), both readings send
the depth ruling through (x, y) to a curve through (x, y). Say the
ruling **fuses** if the two image curves lie on one line (one stroke,
two graduations). Say the readings **fuse at (r_u, r_v)** if *every*
ruling fuses.

**Tangency is automatic [T].** The camera curve's tangent at λ = 0 is
parallel to the glide line's direction (x r_u, y r_v) — checked to
1.6e−10 over random configurations. So a ruling fuses **iff its camera
curve is straight**: shared point plus shared tangent does the rest.
Fusion reduces entirely to straightness, quantified over all rulings.
This replaces v1's implicit "same rulings of the test box."

## 1 · Lemma (gauge pencil) [T] — unchanged

R fixes exactly the diagonal and coordinate members of the pencil at
e = (1,1); so the gauge line of (r_u, r_v) is R-invariant ⇔ Δ = 0.

## 2 · Lemma (curvature identity) [T] — unchanged

c′(0) × c″(0) = ±2xy·r_u r_v (r_u − r_v). The camera ruling through
(x, y) is straight ⇔ xy·Δ = 0.

## 2.1 · Remark (the axis rulings) — NEW

The factor xy in Lemma 2 is content, not slack: the rulings through the
two channel axes (x = 0 or y = 0) are straight — hence fused — at
*every* point of the square, seam or no seam (checked). Off the seam,
the fused sub-family is **exactly** the two axis planes. So even at a
generic split point, the apparatus keeps a fused cross of rulings — the
two channels' own planes — and the split lives entirely in the mixed
rulings, where both channels act at once. Fusion at a point of the
square = fusion of the mixed rulings.

## 3 · Theorem (Seam Theorem) [T]

With D0.1 in place, TFAE:

1. The readings fuse at (r_u, r_v)  (all rulings, per D0.1);
2. the gauge line is R-invariant  (Lemma 1);
3. the per-ray mirror-circle relation |M|·|I| = |P|² holds along every
   ruling (the VM·VI = VP² face; off the seam both readings leave the
   mixed rulings and no single mirror circle is posed);
4. Δ = 0.

(1 ⇔ 4) is now Lemma 2 plus D0.1 — a proof, not an instrument summary:
straightness of all mixed rulings forces xy·Δ ≡ 0 for all (x, y),
hence Δ = 0; conversely Δ = 0 kills the curvature everywhere and
tangency closes each ruling.

## 4 · Corollary (why the meters agree) — REPRICED

Two claims, one forced and one checked:

**Forced [T].** The seam is a reduced hypersurface with one defining
cubic. Any smooth diagnostic vanishing exactly on the seam vanishes
where Δ vanishes and only there — *locus agreement costs nothing and
proves nothing about instruments; it is the algebra of the locus.*

**Checked [T for these three].** Unit-equivalence (diagnostics as
nonvanishing-unit multiples of Δ) additionally requires vanishing to
order one, which is a property, not a given: Δ² is a perfectly smooth
diagnostic with the right zero set and the wrong order (checked: its
ratio to |Δ| dies approaching the seam). The three meters in hand do
vanish at order one — the whisker by its closed form (Δ × positive
factor), the bow by Lemma 2 (ratio bow/|Δ| stable at 0.1833 vs 0.1836
across two decades of approach), the copy-separation by definition. So:
the meters agree on *where* by necessity, and on *rate* by verified
fact. v1's "forced, not coincidental" overstated the second half by one
word.

## 5 · Group reading — CORRECTED

Δ is the simplest polynomial odd under the channel swap and vanishing
on channel degeneration. On the r = 0 edges it is the channel's
**gauge** that trivializes — g ≡ 1, μ ≡ 0, the readout parked at a
fixed value — not the S₃ action, which is defined regardless (0 sits in
the orbit {0, 1, ∞}). Corrected statement: the seam is where the two
channels' gauge responses become indistinguishable — equal to each
other on the diagonal, one of them silent on the edges. "Collision of
the two S₃ copies" survives as the diagonal's description; the edges
are silence, not collision.

## 6 · Bridge to 8.5′ [C] — unchanged, pending the six-step check

If transpose = duality at engine level, (2) reads self-duality and the
theorem becomes: fused locus = self-dual locus, equation Δ. Burden
still localized to R = δ-conjugation.

> *Status, 28 August 2026:* the six-step check (`sixstep2.js`,
> `the-six-step-check-v1.md`) passed in amended form, and §6 discharges
> on the tested domain — fused locus = self-dual locus, equation Δ, for
> the interior and the diagonal; the r = 0 edges await their own limit
> argument.

## 7 · Falsifiers — updated

- A **mixed** ruling straight off-seam: breaks Lemma 2. (Axis rulings
  straight off-seam are now predicted, not falsifying.)
- A smooth diagnostic with the seam's zero set that is not O(Δ):
  impossible; one vanishing like Δ² but presented as a unit multiple:
  breaks §4's checked half for that instrument.
- The six-step check refuting R = δ-conjugation: §6 falls; §§1–5 stand.
