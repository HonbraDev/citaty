import getQuote from "../../src/database/getQuote";
// import getQuoteIds from "../../src/database/getQuoteIds";
import type { Quote as QuoteType } from "../../src/types";
import type { /* GetStaticPaths, */ GetServerSideProps } from "next";
import pageTitle from "../../src/pageTitle";

import { Box, Typography, IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import QuoteCard from "../../components/QuoteCard";
import Head from "next/head";
import Link from "../../components/Link";

export default function Quote({ quote }: { quote: QuoteType }) {
  return (
    <>
      <Head>
        <title>
          "{quote.text}" - {pageTitle}
        </title>
      </Head>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Link href="/">
          <IconButton>
            <ArrowBack />
          </IconButton>
        </Link>
        <Typography variant="h4" component="h1" gutterBottom>
          Citát
        </Typography>
      </Box>
      <QuoteCard quote={quote} disableLink borderless />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (query) => {
  const quote = await getQuote((query.params as any).id);

  console.log("[id]", query.params, quote);

  return {
    props: {
      quote,
    },
  };
};

/* export const getStaticPaths: GetStaticPaths = async () => {
  const ids = await getQuoteIds();

  return {
    paths: ids.map((id) => ({ params: { id } })),
    fallback: "blocking",
  };
};
 */
