import { Typography } from "@mui/material";
import QuoteList from "../components/QuoteList";
import getQuotes from "../src/database/getQuotes";
import pageTitle from "../src/pageTitle";
import Head from "next/head";
import SeoTags from "../components/SeoTags";
import type { NewQuote } from "../src/types";
import type { GetStaticProps } from "next";

export default function Index({ quotes }: { quotes: NewQuote[] }) {
  return (
    <>
      <Head>
        <SeoTags description="Domů" />
      </Head>
      <Typography variant="h4" component="h1" gutterBottom>
        {pageTitle}
      </Typography>
      <QuoteList quotes={quotes} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const quotes = await getQuotes();

  return {
    props: {
      quotes,
    },
    revalidate: 5,
  };
};
