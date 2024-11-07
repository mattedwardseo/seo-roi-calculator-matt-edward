export const calculateROI = (
  tms: number,
  ctr: number,
  cr: number,
  aov: number
): number => {
  return tms * ctr * cr * aov;
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
};