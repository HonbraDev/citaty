import type { NewQuote as QuoteType } from "../../src/types";
import type { GetServerSideProps } from "next";
import getQuote from "../../src/database/getQuote";
import { Box, Typography } from "@mui/material";
import QuoteCard from "../../components/QuoteCard";
import Head from "next/head";
import SeoTags from "../../components/SeoTags";
import BackButton from "../../components/BackButton";

export default function Quote({ quote }: { quote: QuoteType }) {
  return (
    <>
      <Head>
        <SeoTags
          description={`"${quote.text}" ~ ${quote.authorName} | ${quote.year}`}
        />
      </Head>
      <Box sx={{ display: "flex", gap: 2 }}>
        <BackButton />
        <Typography variant="h4" component="h1" gutterBottom>
          Citát
        </Typography>
      </Box>
      <QuoteCard quote={quote} disableLink borderless />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (query) => {
  try {
    const quote = await getQuote((query.params as any).id);

    return {
      props: {
        quote,
      },
    };
  } catch (e) {
    return { notFound: true };
  }
};
