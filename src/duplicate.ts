export default function duplicate<T extends unknown>(x: T, n: number) {
  return Array.from(new Array(n), () => x);
}
