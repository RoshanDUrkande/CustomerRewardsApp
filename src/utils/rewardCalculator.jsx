/**
 * Calculates reward point:
 * - 2 points for every dollar spent over $100.
 * - 1 point for every dollar spent between $50 and $100.
 * Amount is rounded down to the nearest whole dollar before calculation.
 */
export const calculateRewardPoints = (amount) => {
  let points = 0;
  const roundedAmount = Math.floor(amount);

  // Points for spending over $100
  if (roundedAmount > 100) {
    points += 2 * (roundedAmount - 100);
  }

  // Points for spending between $50 and $100
  if (roundedAmount > 50) {
    const spendingInBracket = Math.min(roundedAmount, 100) - 50;
    points += 1 * spendingInBracket;
  }

  return points;
};