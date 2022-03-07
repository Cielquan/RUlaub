import { t } from "@lingui/macro";
import { WebviewWindow } from "@tauri-apps/api/window";
import { ProviderContext } from "notistack";

import { enqueuePersistendErrSnackbar } from "../../utils/snackbarUtils";

const setupErrorEventListeners = async (snackbarHandles: ProviderContext): Promise<void> => {
  const webview = new WebviewWindow("main");

  await webview.listen("config-file-init-write-error", () => {
    enqueuePersistendErrSnackbar(
      t`Failed to create config file. Changes to config cannot be saved.
      Falling back to default config.`,
      snackbarHandles
    );
  });

  await webview.listen("config-file-init-read-error", () => {
    enqueuePersistendErrSnackbar(
      t`Failed to read from config file. Falling back to default config.`,
      snackbarHandles
    );
  });

  await webview.listen("config-file-init-none-error", () => {
    enqueuePersistendErrSnackbar(
      t`No config file found. Falling back to default config.`,
      snackbarHandles
    );
  });

  await webview.listen("db-init-no-file-error", () => {
    enqueuePersistendErrSnackbar(
      t`No database file found. Please select or create a new database file via the sidemenu.`,
      snackbarHandles
    );
  });

  await webview.listen("db-init-connection-error", () => {
    enqueuePersistendErrSnackbar(
      t`Failed to connect to or update the database.
      Please check the database file and restart the programm.`,
      snackbarHandles
    );
  });
};

export default setupErrorEventListeners;
