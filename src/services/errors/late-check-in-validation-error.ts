export class LateCheckInValidateError extends Error {
  constructor() {
    super(
      "The check-in can be only be validated until 20 minutes of its creation"
    );
  }
}
