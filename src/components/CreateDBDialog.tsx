import { t } from "@lingui/macro";
import { Create as CreateIcon, Storage as StorageIcon } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { Box } from "@mui/system";
import { save } from "@tauri-apps/api/dialog";
import { useSnackbar } from "notistack";
import React, { ReactElement, forwardRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import { State, actionCreators } from "../state";

const Transition = forwardRef(
  (
    props: TransitionProps & { children: ReactElement },
    ref: React.Ref<unknown>
    // eslint-disable-next-line react/jsx-props-no-spreading
  ) => <Slide direction="up" ref={ref} {...props} />
);

interface Props {
  onClick?(): void;
}

const CreateDBDialog = ({ onClick }: Props): ReactElement => {
  const dispatch = useDispatch();
  const { closeCreateDBDialog, createNewDB } = bindActionCreators(actionCreators, dispatch);
  const createDBDialogState = useSelector((state: State) => state.createDBDialog);

  const [path, setPath] = useState<string>();
  const [pathError, setPathError] = useState(false);
  const [addDefaults, setAddDefaults] = useState(false);

  const snackbarHandles = useSnackbar();

  const validatePath = (value: string | null | undefined): boolean => {
    if (typeof value !== "string" || value === "") {
      setPathError(true);
      return false;
    }
    setPathError(false);
    return true;
  };

  const selectPath = (): void => {
    save({ filters: [{ name: "Database", extensions: ["db"] }] })
      .then((p) => {
        if (validatePath(p)) setPath(p);
      })
      .catch(() => setPathError(true));
  };

  const createDB = (): void => {
    if (pathError || !validatePath(path)) return;
    closeCreateDBDialog();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    createNewDB(path!, addDefaults, snackbarHandles);
  };

  useEffect(() => {
    setPath(undefined);
    setPathError(false);
    setAddDefaults(false);
  }, [createDBDialogState]);

  const id = "create-db-dialog";

  return (
    <Dialog
      aria-labelledby={id}
      data-testid={id}
      open={createDBDialogState}
      TransitionComponent={Transition}
      keepMounted
      onClose={closeCreateDBDialog}
    >
      <DialogTitle id={id} sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ flexGrow: 1 }}>{t`Create new Database`}</Box>
        <StorageIcon />
      </DialogTitle>
      <DialogContent>
        <FormControl sx={{ display: "flex" }} variant="outlined">
          <InputLabel htmlFor="path">{path === undefined ? t`Database file path` : ""}</InputLabel>
          <OutlinedInput
            id="path"
            value={path}
            error={pathError}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={selectPath}
                  onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) =>
                    event.preventDefault()
                  }
                  edge="end"
                >
                  <CreateIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl
          component="fieldset"
          fullWidth
          sx={{
            marginY: 1,
            padding: 1,
            border: 1,
            borderRadius: 1,
            borderColor: "action.disabled",
            "&:hover": {
              borderColor: "action.active",
            },
          }}
        >
          <FormControlLabel
            label={t`Add default values for Germany NRW to database.`}
            control={
              <Checkbox
                checked={addDefaults}
                onChange={(event) => setAddDefaults(event.target.checked)}
              />
            }
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          data-testid={`${id}-create-btn`}
          onClick={() => {
            if (typeof onClick === "function") onClick();
            createDB();
          }}
        >
          {t`Create`}
        </Button>
        <Button
          data-testid={`${id}-abort-btn`}
          onClick={() => {
            if (typeof onClick === "function") onClick();
            closeCreateDBDialog();
          }}
        >
          {t`Abort`}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
CreateDBDialog.defaultProps = {
  onClick: () => undefined,
};

export default CreateDBDialog;
