import { Trans } from "@lingui/macro";
import { Stack, Switch, Typography } from "@mui/material";

import { LoadingDepth } from "../state/reducers/initialStates";

interface Props {
  depthState: LoadingDepth;
  setDepthSate(newDepth: LoadingDepth): void;
}

const LoadingDepthSwitch = ({ depthState, setDepthSate }: Props): React.ReactElement => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setDepthSate(event.target.checked ? "Full" : "CurrentYear");
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
