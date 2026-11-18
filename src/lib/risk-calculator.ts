/**
 * Security Culture & Human Risk Score (HRS) Calculation Engine
 * Module 3: Security Culture Diagnostics & Human Risk Analytics
 */

export interface HRSBreakdown {
  simulationFailureRate: number; // 0 - 100 %
  cultureVulnerability: number; // 100 - cultureScore
  dwellTimePenalty: number; // 0 - 100 %
  compositeScore: number; // 0 - 100 (lower is safer, higher is riskier)
  riskTier: "Low" | "Moderate" | "Elevated" | "Critical";
  riskColor: string;
}

export function calculateDwellTimePenalty(avgDwellTimeSeconds: number): number {
  // If dwell time to report/triage is over 180 seconds, penalty scales up to 100
  // Fast reporting (< 45s) gives minimal penalty (~15%)
  const penalty = (avgDwellTimeSeconds / 240) * 100;
  return Math.min(100, Math.max(10, Math.round(penalty * 10) / 10));
}

export function calculateHRS(
  simulationFailureRate: number,
  cultureScore: number,
  avgDwellTimeSeconds: number
): HRSBreakdown {
  const failurePart = simulationFailureRate;
  const cultureVuln = Math.max(0, 100 - cultureScore);
  const dwellPenalty = calculateDwellTimePenalty(avgDwellTimeSeconds);

  // Formula specified in Capstone requirement:
  // HRS = (0.45 × Simulation Failure Rate) + (0.35 × (100 - Culture Score)) + (0.20 × Dwell Time Penalty)
  const composite = 0.45 * failurePart + 0.35 * cultureVuln + 0.2 * dwellPenalty;
  const rounded = Math.round(composite * 10) / 10;

  let riskTier: "Low" | "Moderate" | "Elevated" | "Critical" = "Low";
  let riskColor = "#10B981"; // Emerald

  if (rounded >= 65) {
    riskTier = "Critical";
    riskColor = "#EF4444"; // Rose/Red
  } else if (rounded >= 45) {
    riskTier = "Elevated";
    riskColor = "#F59E0B"; // Amber
  } else if (rounded >= 30) {
    riskTier = "Moderate";
    riskColor = "#3B82F6"; // Blue
  } else {
    riskTier = "Low";
    riskColor = "#10B981"; // Emerald
  }

  return {
    simulationFailureRate: Math.round(failurePart * 10) / 10,
    cultureVulnerability: Math.round(cultureVuln * 10) / 10,
    dwellTimePenalty: dwellPenalty,
    compositeScore: rounded,
    riskTier,
    riskColor,
  };
}

/**
 * Calculates countermeasure efficacy percentage
 * Efficacy = ((Control Rate - Test Rate) / Control Rate) * 100
 */
export function calculateCountermeasureEfficacy(
  controlFailureRate: number,
  testFailureRate: number
): number {
  if (controlFailureRate <= 0) return 0;
  const efficacy = ((controlFailureRate - testFailureRate) / controlFailureRate) * 100;
  return Math.round(Math.max(0, efficacy) * 10) / 10;
}
