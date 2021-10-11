import { peopleTable } from "../supabaseTables";

export default async function getQuotes() {
  const { data, error } = await peopleTable
    .select("*")
    .order("legalName", { ascending: true });
  if (error) throw error;
  return data;
}
