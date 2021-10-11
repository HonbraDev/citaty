import type { NextApiRequest, NextApiResponse } from "next";
import { quotesTable } from "../../src/supabaseTables";
import { v4 as generateUUID } from "uuid";
import type { PostgrestError } from "@supabase/supabase-js";

const fields = ["text", "personId", "year"] as const;

type Body = Record<typeof fields[number], string>;

export default async (
  req: NextApiRequest,
  res: NextApiResponse<string | PostgrestError>
) => {
  try {
    const body = req.body as Body;

    console.log(body);

    const { data, error } = await quotesTable.insert({
      id: generateUUID(),
      text: body.text,
      person: body.personId,
    });

    if (error) throw error;

    res.send(data![0].id);
  } catch (e) {
    res.status(500).send(e as PostgrestError);
  }
};
