export type NumberFormat = 'currency' | 'number' | 'percent';

export const formatMoney = (value: number, currency = 'USD', decimals = 2): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};

export const formatPlainNumber = (value: number, decimals = 0): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};

export const formatByKind = (
  value: number,
  format: NumberFormat = 'number',
  unit?: string,
): string => {
  if (format === 'currency') {
    return formatMoney(value, unit ?? 'USD');
  }

  if (format === 'percent') {
    return `${formatPlainNumber(value, 1)}%`;
  }

  const formatted = formatPlainNumber(value, Number.isInteger(value) ? 0 : 1);
  return unit ? `${formatted} ${unit}` : formatted;
};
