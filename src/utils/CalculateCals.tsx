import CalorieThresholds from "../data/CalThresholds.json";

const catTypeStringValues = [
  "typical-neutered",
  "typical-intact",
  "typical-prone-to-gain",
  "diet",
] as const;
export type CatType = (typeof catTypeStringValues)[number];

export function calculateCals(catType: CatType, catWeight: number): number {
  const weightThresholds = CalorieThresholds.weightThresholds;
  const calThresholds = CalorieThresholds[catType];

  if (catWeight <= weightThresholds[0]) {
    return calThresholds[0];
  }

  if (catWeight >= weightThresholds[weightThresholds.length - 1]) {
    return calThresholds[calThresholds.length - 1];
  }

  let i = 0;
  while (weightThresholds[i] < catWeight) {
    i++;
  }
  let upperWeight = weightThresholds[i];
  let lowerWeight = weightThresholds[i - 1];
  let alpha = (catWeight - lowerWeight) / (upperWeight - lowerWeight);

  let interpolatedCalories = lerp(
    calThresholds[i - 1],
    calThresholds[i],
    alpha,
  );
  return +interpolatedCalories.toFixed(2);
}

export function lerp(start: number, end: number, alpha: number): number {
  if (alpha < 0 || alpha > 1) {
    throw new RangeError("Alpha must be within range 0-1.0");
  }
  return start + alpha * (end - start);
}
