export interface Quote {
  text: string;
  author: string;
  year: number;
}

export type QuoteWithId = Quote & { id: string };
