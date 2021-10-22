import { OldQuote, NewQuote } from "./types";

export default function parseRawQuote(quote: OldQuote): NewQuote {
  return {
    authorId: quote.person.id,
    authorName: quote.person.discordNickPrefix || quote.person.legalName,
    text: quote.text,
    year: quote.year,
    id: quote.id,
  };
}
