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
import type { Quote } from "../src/types";
import Link from "./Link";
import ConditionalWrapper from "./ConditionalWrapper";

export default function QuoteCard({
  quote,
  disableLink = false,
  borderless = false,
}: {
  quote: Quote;
  disableLink?: boolean;
  borderless?: boolean;
}) {
  const [fav, setFav] = useState(false);
  const name = quote.person.discordNickPrefix || quote.person.legalName;
  return (
    <ConditionalWrapper
      wrapper={(children) => <Card variant="outlined">{children}</Card>}
      condition={!borderless}
    >
      <>
        <ConditionalWrapper
          condition={!disableLink}
          wrapper={(children) => (
            <Link href={`/quote/${quote.id}`} style={{ color: "inherit" }}>
              <ButtonBase sx={{ width: "100%" }}>{children}</ButtonBase>
            </Link>
          )}
        >
          <CardContent sx={{ textAlign: "center", textDecoration: "none" }}>
            <Typography
              variant="h6"
              component="h3"
              gutterBottom
              sx={{ fontStyle: "italic" }}
            >
              " {quote.text} "
            </Typography>
            <Typography variant="body1" component="h4">
              {name}
              {name.endsWith(".") ? "" : ","} {quote.year}
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
                    text: quote.text,
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
