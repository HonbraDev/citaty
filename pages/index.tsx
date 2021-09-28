import { Box } from "@mui/material";
import QuoteList from "../components/QuoteList";
import objToArr from "../src/objToArr";
import quotes from "../src/quotes";

export default function Index() {
  return (
    <Box sx={{ my: 2 }}>
      <QuoteList quotes={objToArr(quotes)} />
    </Box>
  );
}
