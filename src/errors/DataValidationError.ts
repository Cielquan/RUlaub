export default class DataValidationError extends Error {
  additionalInfo: string;

  constructor(additionalInfo = "") {
    super("Error while validating data from backend.");
    this.name = "DataValidationError";
    this.additionalInfo = additionalInfo;
  }
}
