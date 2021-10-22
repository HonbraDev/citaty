import { IconButtonProps } from "@mui/material";
import { IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useRouter } from "next/router";

export default function BackButton(props: IconButtonProps) {
  const router = useRouter();
  return (
    <IconButton onClick={() => router.back()} {...props}>
      <ArrowBack />
    </IconButton>
  );
}
