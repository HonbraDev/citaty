import type { NextApiRequest, NextApiResponse } from "next";
import { quotesTable } from "../../src/supabaseTables";
import { v4 as generateUUID, validate as validateUUID } from "uuid";
import Joi from "joi";

const fields = ["text", "personId", "year"] as const;

type Body = Record<typeof fields[number], string>;

const schema = Joi.object({
  text: Joi.string().min(3).max(100).required(),
  personId: Joi.string().custom((value) => validateUUID(value)),
  year: Joi.string().custom((value) => {
    const parsed = parseInt(value);
    if (isNaN(parsed)) return false;
    if (value < 2020) return false;
    if (value > new Date().getFullYear()) return false;
    return true;
  }),
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const body = req.body as Body;

    await schema.validateAsync(body);

    const { data, error } = await quotesTable.insert({
      id: generateUUID(),
      text: body.text,
      person: body.personId,
    });

    if (error) throw error;

    res.send(data![0].id);
  } catch (e) {
    res.status(500).send(e);
  }
};
