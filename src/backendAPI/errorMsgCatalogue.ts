/* eslint-disable max-len */
import { t } from "@lingui/macro";

export const getErrorCatalogueMsg = (errCode: string): string => {
  const errorMsgCatalogue: Record<string, string> = {
    "config-file-write-error": t`Error: Failed to write to config file.`,
    "config-not-saved-warn": t`Warning: Config could not be saved.`,
    "config-serialize-error": t`Error: Could not serialize config.`,
    "database-connection-error": t`Error: Failed to connect to database.`,
    "database-creation-error": t`Error: Failed to create new database.`,
    "database-delete-error": t`Error: Failed to delete entry in database.`,
    "database-diesel-error": t`Error: Unknown error with the database.`,
    "database-insert-error": t`Error: Failed to insert new entry in database.`,
    "database-invaild-data-error": t`Error: Got invalid data for database update.`,
    "database-load-error": t`Error: Failed to load entry in database.`,
    "database-not-set-error": t`Error: No database set.`,
    "database-update-error": t`Error: Failed to update entry in database.`,
    "load-school-holidays-link-json-error": t`Error: Failed to load data from school holiday link into JSON schema.`,
    "no-year-to-show-set-error": t`Error: No "year to show" selected.`,
    "to-many-link-db-entries-error": t`Error: Got to many links from the database.`,
    "no-school-holidays-link-set-error": t`Error: No school holidays link is set.`,
    "request-on-school-holidays-link-error": t`Error: Failed to request data from school holiday link.`,
  };

  const defaultErrorMsg = t`Error: Some unknown error happend.
  Please the the logs for more information.`;

  return errorMsgCatalogue[errCode] ?? `${defaultErrorMsg} - (${errCode})`;
};

export default getErrorCatalogueMsg;
