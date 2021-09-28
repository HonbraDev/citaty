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
import type { QuoteWithId } from "../src/types";

export default function QuoteCard({ quote }: { quote: QuoteWithId }) {
  const [fav, setFav] = useState(false);
  return (
    <Card variant="outlined">
      <ButtonBase sx={{ width: "100%" }}>
        <CardContent>
          <Typography
            variant="h6"
            component="h3"
            gutterBottom
            sx={{ fontStyle: "italic" }}
          >
            " {quote.text} "
          </Typography>
          <Typography variant="body1" component="h4">
            {quote.author}
            {quote.author.endsWith(".") ? "" : ","} {quote.year}
          </Typography>
        </CardContent>
      </ButtonBase>
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
                  url: `https://citaty.honbra.com/${quote.id}`,
                })
                .then(() => console.log("Successful share"))
                .catch((error) => console.log("Error sharing:", error));
            } else {
              alert("Sharing is not supported on your device.");
            }
          }}
        >
          <Share />
        </IconButton>
        <IconButton onClick={() => setFav((f) => !f)}>
          {fav ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
      </CardActions>
    </Card>
  );
}
