import { WebviewWindow } from "@tauri-apps/api/window";

import { bindActionCreators, Dispatch } from "redux";

import { actionCreators } from "../state";

const setupEventListeners = async (dispatch: Dispatch): Promise<void> => {
  const webview = new WebviewWindow("main");

  await webview.listen("menu-clicked-lang-en", () => {
    bindActionCreators(actionCreators, dispatch).activateEN();
  });

  await webview.listen("menu-clicked-lang-de", () => {
    bindActionCreators(actionCreators, dispatch).activateDE();
  });

  await webview.listen("menu-clicked-theme-dark", () => {
    bindActionCreators(actionCreators, dispatch).activateDarkTheme();
  });

  await webview.listen("menu-clicked-theme-light", () => {
    bindActionCreators(actionCreators, dispatch).activateLightTheme();
  });

  await webview.listen("menu-clicked-settings", () => {
    bindActionCreators(actionCreators, dispatch).openSettingsDialog();
  });

  await webview.listen("menu-clicked-about", () => {
    bindActionCreators(actionCreators, dispatch).openAboutPage();
  });

  await webview.listen("menu-clicked-db-new", () => {
    // TODO:#i# impl when new DB Dialog is finished
  });

  await webview.listen("menu-clicked-db-select", () => {
    // TODO:#i# impl when select DB Dialog is finished
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

export default setupEventListeners;