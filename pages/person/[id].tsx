import type { GetServerSideProps } from "next";
import type { NewQuote as QuoteType } from "../../src/types";
import { Box, Typography } from "@mui/material";
import Head from "next/head";
import SeoTags from "../../components/SeoTags";
import getQuotesByPerson from "../../src/database/getQuotesByPerson";
import QuoteList from "../../components/QuoteList";
import BackButton from "../../components/BackButton";

export default function Quote({
  quotes,
  person,
}: {
  quotes: QuoteType[];
  person: { name: string };
}) {
  return (
    <>
      <Head>
        <SeoTags description={person.name} />
      </Head>
      <Box sx={{ display: "flex", gap: 2 }}>
        <BackButton />
        <Typography variant="h4" component="h1" gutterBottom>
          {quotes[0].authorName}
        </Typography>
      </Box>
      <QuoteList quotes={quotes} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (query) => {
  try {
    const quotes = await getQuotesByPerson((query.params as any).id);

    return {
      props: {
        quotes,
        person: {
          name: quotes[0].authorName,
        },
      },
    };
  } catch (e) {
    return { notFound: true };
  }
};
