import { quotesTable } from "../supabaseTables";

export default async function getQuotes() {
  const { data, error } = await quotesTable.select("*, person ( * )").order("createdAt");
  if (error) throw error;
  return data;
}
