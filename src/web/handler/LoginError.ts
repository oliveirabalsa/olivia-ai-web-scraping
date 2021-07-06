export class LoginError extends Error {
  constructor(error: string) {
    super(error);
    this.name = "LoginError";
  }
}
