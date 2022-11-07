import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomizedSnackbars = () => {
  const { alert_set, msg, alert_type } = useSelector(
    (state) => state.alert.alertData
  );
  const [open, setOpen] = React.useState(false);

  const [state, setState] = React.useState({
    vertical: "top",
    horizontal: "center",
  });

  useEffect(() => {
    if (alert_set) {
      setOpen(true);
    }
  }, [alert_set]);

  const { vertical, horizontal } = state;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      {alert_set && msg && alert_type && (
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Snackbar
            open={open}
            autoHideDuration={4000}
            onClose={handleClose}
            anchorOrigin={{ vertical, horizontal }}
            key={vertical + horizontal}
          >
            <Alert
              onClose={handleClose}
              severity={alert_type}
              sx={{ width: "100%" }}
            >
              {msg}
            </Alert>
          </Snackbar>
        </Stack>
      )}
    </>
  );
};

export default CustomizedSnackbars;
