import { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  ButtonBase,
} from "@mui/material";
import { Share, Favorite, FavoriteBorder } from "@mui/icons-material";
import type { NewQuote } from "../src/types";
import Link from "./Link";
import ConditionalWrapper from "./ConditionalWrapper";
import { styled } from "@mui/system";

const QuoteTypography = styled(Typography)`
  &:before {
    content: '" ';
  }
  &:after {
    content: ' "';
  }
`;

export default function QuoteCard({
  quote,
  disableLink = false,
  borderless = false,
}: {
  quote: NewQuote;
  disableLink?: boolean;
  borderless?: boolean;
}) {
  const [fav, setFav] = useState(false);
  return (
    <ConditionalWrapper
      wrapper={(children) => <Card variant="outlined">{children}</Card>}
      condition={!borderless}
    >
      <>
        <ConditionalWrapper
          condition={!disableLink}
          wrapper={(children) => (
            <Link
              href={`/quote/${quote.id}`}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <ButtonBase sx={{ width: "100%" }}>{children}</ButtonBase>
            </Link>
          )}
        >
          <CardContent sx={{ textAlign: "center", textDecoration: "none" }}>
            <QuoteTypography
              variant="h6"
              gutterBottom
              sx={{ fontStyle: "italic" }}
            >
              {quote.text}
            </QuoteTypography>
            <Typography variant="body1" component="h4">
              {quote.authorName} | {quote.year}
            </Typography>
          </CardContent>
        </ConditionalWrapper>
        <CardActions>
          <IconButton
            /* iOS Safari is stupid */
            sx={{ marginLeft: "auto" }}
            onClick={() => {
              if (navigator.share) {
                navigator
                  .share({
                    title: "Mensa citáty",
                    text: `"quote.text"${"\n"}~ ${quote.authorName} | ${
                      quote.year
                    }`,
                    url: `https://citaty.honbra.com/quote/${quote.id}`,
                  })
                  .catch((error) => console.error("Error sharing:", error));
              } else {
                alert("Sharing is not supported on your device.");
              }
            }}
          >
            <Share />
          </IconButton>
          <IconButton onClick={() => setFav((f) => !f)} disabled>
            {fav ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
        </CardActions>
      </>
    </ConditionalWrapper>
  );
}
