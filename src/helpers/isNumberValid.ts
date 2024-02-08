export const isNumberValid = (n: number) => {
  if (
    !n ||
    Number.isNaN(n) ||
    !isFinite(n) ||
    n <= 0 ||
    typeof n !== 'number'
  ) {
    return false;
  }

  return true;
};
