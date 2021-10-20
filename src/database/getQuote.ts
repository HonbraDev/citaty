import { quotesTable } from "../supabaseTables";

export default async function getQuote(id: string) {
  const { data, error } = await quotesTable()
    .select("*, person ( * )")
    .eq("id", id);
  if (error) throw error;
  if (data?.length === 0) return null;
  return data![0];
}
