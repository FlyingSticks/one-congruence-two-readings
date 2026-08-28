# The Seam Theorem — v1 (draft for Kevin's check)

> **Provenance.** Written 18 August 2026; superseded the same day by
> v1.1 (`the-seam-theorem-v1-1.md`), which repairs three dents named in
> review. Kept because v1.1's setup and lemmas refer back to it and its
> checks (`verify_seam.js`, 9/9) still stand. Recovered verbatim from
> the session record 28 August 2026.

*A stab at the theorem that explains why the meters agree. Numerical
support in `verify_seam.js` (9/9). Claims are graded: **[T]** =
proved or one-computation, **[C]** = conjecture, pending.*

## 0 · Setup

One depth parameter λ; two channel rates (r_u, r_v) ∈ [0,1]².
Per channel the **gauge** is g_i(λ) = 1 + r_i λ (viewing convention;
the engine convention 1 − r_i λ flips one sign below and nothing else).

Two readings of the congruence at (r_u, r_v):

- **edge reading** (glide):    img₁(x, y, λ) = (x·g_u, y·g_v)
- **ray reading** (cross-slit): img₂(x, y, λ) = (x/g_u, y/g_v)

so img₂ = R(img₁) channelwise, where **R is the Reciprocal** — the
gauge product identity, the camera factor, the relation ρτ = ω.

Call **Δ = r_u r_v (r_v − r_u)** the *seam cubic*, and its zero set —
the diagonal plus the two r = 0 edges — the **seam**. Note the seam is
three concurrent lines through the orthographic corner (0,0): a
degenerate cubic, a fan, with the channel-swap ℤ₂ fixing the diagonal
and exchanging the two edges.

## 1 · Lemma (the gauge pencil and its reciprocal) [T]

In the gauge plane with coordinates (a, b) = (g_u, g_v), the apparatus
point (r_u, r_v) is the line **L** through e = (1,1) with direction
(r_u, r_v) — a member of the pencil at e. The Reciprocal
R(a, b) = (1/a, 1/b) fixes e and maps the pencil to conics through e.
The only members whose R-image is again a line — indeed the same line —
are:

- the diagonal a = b            (direction r_u = r_v),
- the coordinate lines a = 1, b = 1  (direction r_u = 0 or r_v = 0).

So **L is R-invariant ⇔ Δ = 0.** Everything below is this lemma wearing
different clothes.

## 2 · Lemma (curvature identity) [T]

For the ray reading of the depth line through (x, y):

  c′(0) × c″(0) = ±2xy · r_u r_v (r_u − r_v)

(sign is the convention sign; verified to 8e−9 both ways). Hence:

- the ray depth curve is **straight ⇔ Δ = 0**, and
- its leading bow is |xy| · |Δ| times a positive scale factor.

The glide depth line is linear in λ, straight identically. This is the
bow meter's law: the curvature *numerator of the camera is the seam
cubic itself.*

## 3 · Theorem (Seam Theorem) [T, modulo the equivalences as stated]

The following are equivalent:

1. **Fused** — the two readings rule the same line family (one drawing,
   two graduations).
2. The gauge line L is invariant under the Reciprocal R (Lemma 1).
3. **Mirror-circle form** — along every ruling the two readings satisfy
   the per-ray inversion |M|·|I| = |P|², M = glide mark, I = camera
   image, P = picture-plane trace (the VM·VI = VP² relation holding
   ray-by-ray). Off the seam both readings leave the ray, so no single
   mirror circle exists per ruling; the relation survives only
   channelwise.
4. Δ = r_u r_v (r_v − r_u) = 0.

(1 ⇔ 4) is the instrument's verified content; (2) is Lemma 1;
(3 ⇔ 1) checked numerically both directions in `verify_seam.js`.

## 4 · Corollary (why the meters agree) [T]

The seam is a reduced hypersurface with one defining cubic. Therefore
**any smooth diagnostic that vanishes exactly on the seam factors as
(nonvanishing unit) × Δ near the seam.** The whisker gap
(closed form: Δ × λ²X₀Y₀ / (|τ(μ_u)τ(μ_v)|·|V−A|)), the bow
(Lemma 2: Δ × 2|xy| + higher order), and the separation of the two S₃
copies are unit multiples of one another — *forced by the algebra of
the locus, not a coincidence of instruments.* Independently built
meters must agree because there is only one cubic to vanish.

## 5 · Group reading [T for the structure, wording his]

Δ is the simplest polynomial with the seam's equivariance type: odd
under the channel swap (the Vandermonde-like factor r_v − r_u) and
vanishing when either channel degenerates (the factors r_u, r_v). The
seam is the **collision locus of the two S₃ copies**: with each other
on the diagonal (S₃ × S₃ → diagonal S₃), with the trivial action on the
edges (a factor dies). Fused = collided; the meters measure the
distance to collision.

## 6 · Bridge to 8.5′ [C — pending the six-step check]

If the engine-level identification *transpose = duality* holds
(cross-slit on K = δ∘(glide on δK)∘δ up to a fixed S₃ element), then
condition (2) — R-invariance of the configuration — reads
**self-duality**, and the Seam Theorem specializes to the sharpened
conjecture's fusion claim: *fused locus = self-dual locus*, now with Δ
as its equation. The proof burden localizes entirely to the
identification R = δ-conjugation; Lemmas 1–2 carry the rest.

## 7 · What would falsify it

- A diagnostic that vanishes on the seam but is *not* O(Δ) — would
  break §4 (requires non-smooth or higher-order-tuned construction).
- A point off the seam where the two readings rule one family — would
  break (1 ⇔ 4); Lemma 2 forbids it.
- The six-step check refuting R = δ-conjugation — §6 falls, §§1–5
  stand unaffected.
