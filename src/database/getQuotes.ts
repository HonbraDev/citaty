import parseRawQuote from "../parseRawQuote";
import { quotesTable } from "../supabaseTables";
import type { NewQuote, OldQuote } from "../types";

export default async function getQuotes(): Promise<NewQuote[]> {
  const { data, error } = await quotesTable().select("*, person ( * )");
  if (error) throw error;
  return (data as any[] as OldQuote[])
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .map(parseRawQuote);
}
