import parseRawQuote from "../parseRawQuote";
import { quotesTable } from "../supabaseTables";
import { NewQuote, OldQuote } from "../types";

export default async function getQuote(id: string): Promise<NewQuote> {
  const { data, error } = await quotesTable()
    .select("*, person ( * )")
    .eq("id", id);
  if (error) throw error;
  if (data?.length === 0) throw new Error("Quote not found");
  const quote = data![0] as unknown as OldQuote;
  return parseRawQuote(quote);
}
