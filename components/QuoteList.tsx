import type { QuoteWithId } from "../src/types";
import { Box, BoxProps } from "@mui/material";
import QuoteCard from "./QuoteCard";

export default function QuoteList({
  quotes,
  sx,
  ...props
}: { quotes: QuoteWithId[] } & BoxProps) {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: 2, ...sx }}
      {...props}
    >
      {quotes.map((q) => (
        <QuoteCard quote={q} key={q.id} />
      ))}
    </Box>
  );
}
