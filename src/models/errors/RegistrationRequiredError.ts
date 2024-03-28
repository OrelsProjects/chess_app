export default class RegistrationRequiredError extends Error {
  code: number;
  constructor(message?: string) {
    super(message);
    this.name = "RegistrationRequiredError";
    this.code = 403;
  }
}
