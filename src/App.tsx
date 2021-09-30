import { CssBaseline } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import React, { ReactElement } from "react";

import Calendar from "./components/Calendar";
import InfoPage from "./components/InfoPage";
import Navbar from "./components/Navbar";
import NewHolidayButton from "./components/NewHolidayButton";
import SettingsDialog from "./components/SettingsDialog";
import SideMenu from "./components/SideMenu";
import UsersDialog from "./components/UsersDialog";

const StyledMain = styled("main")(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginTop: `${theme.mixins.toolbar.minHeight}px`,

  "@media (min-width:0px) and (orientation: landscape)": {
    marginTop: `calc(${theme.mixins.toolbar.minHeight}px - 6px)`,
  },

  "@media (min-width:600px)": {
    marginTop: `calc(${theme.mixins.toolbar.minHeight}px + 8px)`,
  },
}));

const App = (): ReactElement => (
  <Box sx={{ boxSizing: "border-box" }}>
    <CssBaseline />
    <Box
      data-testid="rulaub-root"
      sx={{
        display: "flex",
        position: "absolute",
        top: "0",
        bottom: "0",
        left: "0",
        right: "0",
      }}
    >
      <Navbar />
      <SideMenu />
      <StyledMain data-testid="rulaub-main">
        <Calendar />
        <NewHolidayButton />
      </StyledMain>
    </Box>
    <InfoPage />
    <SettingsDialog />
    <UsersDialog />
  </Box>
);

export default App;
