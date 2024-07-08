export function formatCurrency(total: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  })
    .format(total)
    .split("")
    .map((char) => (char === "$" ? "$ " : char))
    .join("");
}
