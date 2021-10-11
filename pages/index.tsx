import { Box } from "@mui/material";
import QuoteList from "../components/QuoteList";
import type { Quote } from "../src/types";
import getQuotes from "../src/database/getQuotes";
import Head from "next/head";
import type { GetStaticProps } from "next";

export default function Index({ quotes }: { quotes: Quote[] }) {
  return (
    <>
      <Head>
        <title>Mensastické citáty</title>
      </Head>
      <Box sx={{ my: 2 }}>
        <QuoteList quotes={quotes} />
      </Box>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const quotes = await getQuotes();

  return {
    props: {
      quotes,
    },
    revalidate: 10,
  };
};
