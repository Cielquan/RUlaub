export default class DataFetchingError extends Error {
  additionalInfo: string;

  constructor(additionalInfo = "") {
    super("Error while fetching data from backend.");
    this.name = "DataValidationError";
    this.additionalInfo = additionalInfo;
  }
}
