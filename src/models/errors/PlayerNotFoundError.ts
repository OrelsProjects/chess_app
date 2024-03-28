export default class PlayerNumberNotFoundError extends Error {
  code: number;
  constructor(message?: string) {
    super(message);
    this.name = "PlayerNumberNotFoundError";
    this.code = 403;
  }
}
