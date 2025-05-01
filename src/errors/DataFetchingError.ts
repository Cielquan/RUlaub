export default class DataFetchingError extends Error {
  additionalInfo: string;

  constructor(dataTarget: string, additionalInfo = "") {
    super(`Error while fetching data (${dataTarget}) from backend.`);
    this.name = "DataValidationError";
    this.additionalInfo = additionalInfo;
  }
}
