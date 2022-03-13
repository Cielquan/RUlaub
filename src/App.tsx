import { CssBaseline } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import { invoke } from "@tauri-apps/api/tauri";
import React, { ReactElement } from "react";

import AboutPage from "./components/AboutPage";
import AddVacationDialog from "./components/AddVacationDialog";
import Calendar from "./components/Calendar";
import DownloadSchoolHolidaysDialog from "./components/DownloadSchoolHolidaysDialog";
import Navbar from "./components/Navbar";
import NewHolidayButton from "./components/NewHolidayButton";
import PublicHolidaysDialog from "./components/PublicHolidaysDialog";
import SchoolHolidaysDialog from "./components/SchoolHolidaysDialog";
import SchoolHolidaysDownloadButton from "./components/SchoolHolidaysDownloadButton";
import SettingsDialog from "./components/SettingsDialog";
import SideMenu from "./components/SideMenu";
import UsersDialog from "./components/UsersDialog";
import VacationTypesDialog from "./components/VacationTypesDialog";
import VacationsDialog from "./components/VacationsDialog";
import { useMountEffect } from "./hooks";

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

const App = (): ReactElement => {
  useMountEffect(() => {
    invoke("finished_init_load");
  });

  return (
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
          <SchoolHolidaysDownloadButton />
        </StyledMain>
      </Box>
      <AboutPage />
      <AddVacationDialog />
      <DownloadSchoolHolidaysDialog />
      <PublicHolidaysDialog />
      <SchoolHolidaysDialog />
      <SettingsDialog />
      <UsersDialog />
      <VacationsDialog />
      <VacationTypesDialog />
    </Box>
  );
};

export default App;
