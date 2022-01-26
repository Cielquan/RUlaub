import { WebviewWindow } from "@tauri-apps/api/window";
import { ProviderContext } from "notistack";
import { bindActionCreators, Dispatch } from "redux";

import { actionCreators } from "../../state";

const setupMenuEventListeners = async (
  dispatch: Dispatch,
  snackbarHandles: ProviderContext
): Promise<void> => {
  const webview = new WebviewWindow("main");

  await webview.listen("menu-clicked-lang-en", () => {
    bindActionCreators(actionCreators, dispatch).setLanguage("en-US", snackbarHandles);
  });

  await webview.listen("menu-clicked-lang-de", () => {
    bindActionCreators(actionCreators, dispatch).setLanguage("de-DE", snackbarHandles);
  });

  await webview.listen("menu-clicked-theme-dark", () => {
    bindActionCreators(actionCreators, dispatch).setTheme("dark", snackbarHandles);
  });

  await webview.listen("menu-clicked-theme-light", () => {
    bindActionCreators(actionCreators, dispatch).setTheme("light", snackbarHandles);
  });

  await webview.listen("menu-clicked-settings", () => {
    bindActionCreators(actionCreators, dispatch).openSettingsDialog();
  });

  await webview.listen("menu-clicked-about", () => {
    bindActionCreators(actionCreators, dispatch).openAboutPage();
  });

  await webview.listen("menu-clicked-db-new", () => {
    bindActionCreators(actionCreators, dispatch).createNewDB(snackbarHandles);
  });

  await webview.listen("menu-clicked-db-select", () => {
    bindActionCreators(actionCreators, dispatch).selectDB(snackbarHandles);
  });

  await webview.listen("menu-clicked-vac-new", () => {
    // TODO:#i# impl when new vac Dialog is finished
  });

  await webview.listen("menu-clicked-vac-edit", () => {
    bindActionCreators(actionCreators, dispatch).openVacationsDialog();
  });

  await webview.listen("menu-clicked-users", () => {
    bindActionCreators(actionCreators, dispatch).openUsersDialog();
  });

  await webview.listen("menu-clicked-pub_holidays", () => {
    bindActionCreators(actionCreators, dispatch).openPublicHolidaysDialog();
  });

  await webview.listen("menu-clicked-school_holidays", () => {
    bindActionCreators(actionCreators, dispatch).openSchoolHolidaysDialog();
  });

  await webview.listen("menu-clicked-vac_types", () => {
    bindActionCreators(actionCreators, dispatch).openVacationTypesDialog();
  });
};

export default setupMenuEventListeners;
