import {
  Container,
  Paper,
  Box,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import { FormatQuote, Add, Favorite } from "@mui/icons-material";
import { useRouter } from "next/router";

const pages = ["/", "/create", "/favorite"];

export default function Layout({ children }: { children: any }) {
  const router = useRouter();
  const value = pages.indexOf(router.route);
  const showNav = value > -1;

  return (
    <>
      <Box sx={{ pb: showNav ? 7 : undefined }}>
        <Container maxWidth="sm">
          <Box sx={{ my: 2 }}>{children}</Box>
        </Container>
        {showNav ? (
          <Paper
            sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
            elevation={3}
          >
            <BottomNavigation
              showLabels
              value={value}
              onChange={(_, newValue) => {
                console.log("Redirect to", pages[newValue]);
                router.push(pages[newValue]);
              }}
            >
              <BottomNavigationAction label="Citáty" icon={<FormatQuote />} disabled={router.route === "/"} />
              <BottomNavigationAction label="Vytvořit" icon={<Add />} disabled={router.route === "/create"} />
              <BottomNavigationAction
                label="Oblíbené"
                icon={<Favorite />}
                disabled
                sx={{ color: "lightgray" }}
              />
            </BottomNavigation>
          </Paper>
        ) : null}
      </Box>
    </>
  );
}
