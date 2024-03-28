export default class UserNotFound extends Error {
  code: number;
  constructor(message?: string) {
    super(message);
    this.name = "UserNotFound";
    this.code = 404;
  }
}
