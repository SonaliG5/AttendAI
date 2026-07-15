// src/lib/attendance.js

/**
 * Given attended/total classes and a requirement threshold,
 * returns the current status, the recommendation, and priority.
 *
 * r = requirement as a fraction (e.g. 0.75 for 75%)
 */
export function analyzeSubject(attended, total, requirementPercent) {
  const r = requirementPercent / 100
  const currentPercent = total === 0 ? 0 : (attended / total) * 100
  const isSafe = currentPercent >= requirementPercent

  if (isSafe) {
    // m ≤ attended / r - total  →  largest number of classes safely missable
    const missable = Math.floor(attended / r - total)
    const cushion = currentPercent - requirementPercent
    return {
      status: 'Safe',
      recommendation: missable > 0
        ? `Can safely miss ${missable} more class${missable === 1 ? '' : 'es'}`
        : `At exact threshold — cannot miss any more`,
      priority: cushion < 3 ? 'Watch' : 'Safe',
      currentPercent,
    }
  } else {
    // x ≥ (r × total - attended) / (1 - r) → classes needed, consecutive, zero absences
    const needed = Math.ceil((r * total - attended) / (1 - r))
    const gap = requirementPercent - currentPercent
    return {
      status: 'Low',
      recommendation: `Attend next ${needed} class${needed === 1 ? '' : 'es'} in a row to reach ${requirementPercent}%`,
      priority: gap > 6 ? 'High' : 'Medium',
      currentPercent,
    }
  }
}