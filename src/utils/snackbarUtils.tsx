import { Close as CloseIcon } from "@mui/icons-material";
import { Button } from "@mui/material";
import { SnackbarKey } from "notistack";
import { ReactElement } from "react";

type closeSnackbarFn = (key?: SnackbarKey | undefined) => void;
type snackbarCloseActionFn = (key: SnackbarKey) => ReactElement;

export const createSnackbarCloseAction = (
  closeSnackbar: closeSnackbarFn
): snackbarCloseActionFn => {
  return (key: SnackbarKey): ReactElement => {
    return (
      <>
        <Button onClick={(): void => closeSnackbar(key)} sx={{ minWidth: 24 }}>
          <CloseIcon />
        </Button>
      </>
    );
  };
};

export default createSnackbarCloseAction;
