export default class DataValidationError extends Error {
  additionalInfo: string;

  constructor(dataTarget: string, additionalInfo = "") {
    super(`Error while validating data (${dataTarget}) from backend.`);
    this.name = "DataValidationError";
    this.additionalInfo = additionalInfo;
  }
}
