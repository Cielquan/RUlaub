import { Trans } from "@lingui/macro";
import { Stack, Switch, Typography } from "@mui/material";
import { ProviderContext, useSnackbar } from "notistack";

import { LoadingDepth } from "../state/reducers/initialStates";

interface Props {
  depthState: LoadingDepth;
  setDepthState(snackbarHandles: ProviderContext, newDepth: LoadingDepth): void;
}

const LoadingDepthSwitch = ({ depthState, setDepthState }: Props): React.ReactElement => {
  const snackbarHandles = useSnackbar();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setDepthState(snackbarHandles, event.target.checked ? "Full" : "CurrentYear");
  };

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Typography>
        <Trans>Load current year data</Trans>
      </Typography>
      <Switch checked={depthState === "Full"} onChange={handleChange} />
      <Typography>
        <Trans>Load all data</Trans>
      </Typography>
    </Stack>
  );
};

export default LoadingDepthSwitch;
