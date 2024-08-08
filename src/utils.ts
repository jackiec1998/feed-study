export function kFormatter(n: number): string {
  if (n < 0) {
    throw new Error("To format a number, it needs to be positive.");
  }

  return Math.abs(n) > 999 ? (n / 1_000).toFixed(1) + "K" : n.toString();
}
