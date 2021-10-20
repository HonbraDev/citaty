import type { NextApiRequest, NextApiResponse } from "next";
import getQuote from "../../../src/database/getQuote";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const quote = await getQuote(req.query.id as string);
    res.json(quote);
  } catch (e) {
    res.status(500).send(e);
  }
};
