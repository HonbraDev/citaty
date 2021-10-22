import type { NewQuote } from "../src/types";
import { Box, BoxProps } from "@mui/material";
import QuoteCard from "./QuoteCard";

export default function QuoteList({
  quotes,
  sx,
  disableLink = false,
  ...props
}: { quotes: NewQuote[] } & BoxProps & { disableLink?: boolean }) {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: 2, ...sx }}
      {...props}
    >
      {quotes.map((q) => (
        <QuoteCard quote={q} key={q.id} disableLink={disableLink} />
      ))}
    </Box>
  );
}
