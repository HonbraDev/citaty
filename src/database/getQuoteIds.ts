import { quotesTable } from "../supabaseTables";

export default async function getQuoteIds(): Promise<string[]> {
  const { data, error } = await quotesTable().select("id").order("createdAt");
  if (error) throw error;
  return (data as unknown as { id: string }[]).map(({ id }) => id);
}
