export default function objToArr<T extends Object>(obj: Record<string, T>) {
  return Object.entries(obj).map(([k, v]) => ({ id: k, ...v }));
}
