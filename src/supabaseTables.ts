import supabase from "./supabase";
import type { Person, PersonType, Quote } from "./types";

export const peopleTable = supabase.from<Person>("people");
export const peopleTypesTable = supabase.from<PersonType>("people");
export const quotesTable = supabase.from<Quote>("quotes");
