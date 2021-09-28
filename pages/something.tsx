import NextLink from "next/link";
import { Link } from "@mui/material";

export default function Something() {
  return (
    <>
      <NextLink href="/">
        <Link href="/">Home</Link>
      </NextLink>
    </>
  );
}
