/**
 *
 * @param {number} value - number want to be convert
 * @param {string} locales - ISO Language Codes + ISO Country Codes
 * @param {string} currency - currency format (ISO 4217 Currency Codes)
 * @returns currency formatted by locales
 */
const toCurrency = ({
  value,
  locales = "id-ID",
  currency = "IDR",
  style = ["currency" | "decimal"],
}) => {
  if (isNaN(value)) {
    return value;
  }

  return new Intl.NumberFormat(locales, {
    style: style,
    currency: currency,
  }).format(value);
};

export { toCurrency };
