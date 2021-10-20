import { quotesTable } from "../supabaseTables";
import type { Quote } from "../types";

export default async function getQuotes() {
  const { data, error } = await quotesTable().select("*, person ( * )");
  if (error) throw error;
  return (data as any[] as Quote[]).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}
