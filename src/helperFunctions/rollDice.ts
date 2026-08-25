export function rollDice(count: number): number {
  let total = 0;
  for (let i = 0; i < count; i++) {
    total += Math.floor(Math.random() * 6) + 1;
  }
  return total;
}
