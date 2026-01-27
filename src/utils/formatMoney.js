export function formatMoney(amount) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0, // remove decimal places for whole naira amounts
    maximumFractionDigits: 0,
  }).format(amount);
}
