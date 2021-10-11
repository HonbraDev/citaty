import type { NextApiRequest, NextApiResponse } from "next";
import getQuotes from "../../src/database/getQuotes";

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const quotes = await getQuotes();
    res.json(quotes);
  } catch (e) {
    res.status(500).send(e);
  }
};
