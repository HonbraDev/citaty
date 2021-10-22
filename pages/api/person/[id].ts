import type { NextApiRequest, NextApiResponse } from "next";
import getQuotesByPerson from "../../../src/database/getQuotesByPerson";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const quote = await getQuotesByPerson(req.query.id as string);
    res.json(quote);
  } catch (e) {
    res.status(500).send(e);
  }
};
