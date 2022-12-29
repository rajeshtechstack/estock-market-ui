import { Snackbar } from "@mui/material";

export default function toaster(props) {
  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      onClose={handleClose}
      message="I love snacks"
      key={vertical + horizontal}
    />
  );
}
