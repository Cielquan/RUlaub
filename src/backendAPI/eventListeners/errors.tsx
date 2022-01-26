import { t } from "@lingui/macro";
import { WebviewWindow } from "@tauri-apps/api/window";
import { ProviderContext } from "notistack";

import createSnackbarCloseAction from "../../utils/snackbarUtils";

const setupErrorEventListeners = async ({
  enqueueSnackbar,
  closeSnackbar,
}: ProviderContext): Promise<void> => {
  const webview = new WebviewWindow("main");

  const action = createSnackbarCloseAction(closeSnackbar);

  await webview.listen("config-file-init-write-error", () => {
    enqueueSnackbar(
      t`Failed to create config file. Changes to config cannot be saved.
      Falling back to default config.`,
      {
        variant: "error",
        persist: true,
        action,
      }
    );
  });

  await webview.listen("config-file-init-read-error", () => {
    enqueueSnackbar(
      t`Failed to read from config file. Falling back to default config.`,
      {
        variant: "error",
        persist: true,
        action,
      }
    );
  });

  await webview.listen("config-file-init-none-error", () => {
    enqueueSnackbar(t`No config file found. Falling back to default config.`, {
      variant: "error",
      persist: true,
      action,
    });
  });
};

export default setupErrorEventListeners;
