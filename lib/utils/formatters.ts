/**
 * Currency & Normalization Utility
 * Supports integer minor-unit currency handling (LKR) with hybrid backward-compatibility.
 */

/**
 * Converts a major currency amount to integer minor units (e.g. 4000 -> 400000).
 */
export function toMinorUnits(amount: number): number {
  if (amount === undefined || amount === null || isNaN(amount)) return 0;
  // If already in minor units (e.g. > 10000), return as integer
  if (amount > 10000) {
    return Math.round(amount);
  }
  return Math.round(amount * 100);
}

/**
 * Converts integer minor units to major currency amount (e.g. 400000 -> 4000).
 * Safely handles amounts that might already be in major units.
 */
export function fromMinorUnits(amount: number): number {
  if (amount === undefined || amount === null || isNaN(amount)) return 0;
  // If amount > 10000 (e.g. 400000), treat as minor units and divide by 100
  if (amount > 10000) {
    return amount / 100;
  }
  // Otherwise treat as already in major units
  return amount;
}

/**
 * Formats a currency amount into standard Sri Lankan Rupee representation.
 * Handles hybrid backward-compatibility safely:
 * - If amount > 10000 (e.g. 400000), treats as minor units and divides by 100
 * - If amount is small (e.g. 4000), treats as major units to prevent 100x pricing bugs
 */
export function formatCurrency(
  amount: number,
  currency: string = 'LKR',
  isMinorUnits: boolean = true
): string {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return 'LKR 0.00';
  }

  let majorAmount = Number(amount);
  if (isMinorUnits) {
    if (majorAmount > 10000) {
      majorAmount = majorAmount / 100;
    }
  }

  try {
    return `${currency || 'LKR'} ${majorAmount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  } catch {
    return `${currency || 'LKR'} ${majorAmount.toFixed(2)}`;
  }
}
