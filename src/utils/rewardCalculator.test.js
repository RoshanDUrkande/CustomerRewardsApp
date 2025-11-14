import { calculateRewardPoints } from "./rewardCalculator";

describe("calculateRewardPoints", () => {
  test("no points for $49", () => {
    expect(calculateRewardPoints(49)).toBe(0);
  });

  test("50 -> 1 point per dollar between 50 and 100", () => {
    expect(calculateRewardPoints(75)).toBe(25);
  });

  test("above 100 -> double points over 100", () => {
    expect(calculateRewardPoints(120)).toBe(90); // 50 (50–100) + 40 (2×20)
  });

  test("fractional amount should floor", () => {
    expect(calculateRewardPoints(99.9)).toBe(49);
  });

  test("exactly 100 should yield 50 points", () => {
    expect(calculateRewardPoints(100)).toBe(50);
  });

  // 🧪 New Edge Case
  test("negative or zero amounts should yield 0 points", () => {
    expect(calculateRewardPoints(0)).toBe(0);
    expect(calculateRewardPoints(-10)).toBe(0);
  });
});
