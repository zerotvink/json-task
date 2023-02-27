export function compareNumbers(a: any, b: any) {
  const first = a.split("x");
  const second = b.split("x");
  return Number(first[0]) - Number(second[0]);
}
