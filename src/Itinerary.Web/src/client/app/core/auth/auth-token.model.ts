export class AuthToken {
  constructor(
    public expiration: Date,
    public token: string) {
  }
}
