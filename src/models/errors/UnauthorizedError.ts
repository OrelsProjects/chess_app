// unauthorized error
export class UnauthorizedError extends Error {
  code: number = 401;
  constructor() {
    super("Unauthorized");
  }
}
