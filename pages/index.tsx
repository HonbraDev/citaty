import { Typography } from "@mui/material";
import QuoteList from "../components/QuoteList";
import type { Quote } from "../src/types";
import getQuotes from "../src/database/getQuotes";
import type { GetServerSideProps } from "next";
import pageTitle from "../src/pageTitle";

export default function Index({ quotes }: { quotes: Quote[] }) {
  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        {pageTitle}
      </Typography>
      <QuoteList quotes={quotes} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const quotes = await getQuotes();

  return {
    props: {
      quotes,
    },
    revalidate: 10,
  };
};
