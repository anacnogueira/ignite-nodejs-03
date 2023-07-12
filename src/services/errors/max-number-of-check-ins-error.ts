export class MaxNumberOfCheckInsError extends Error {
  constructor() {
    super("Max number od check-ins reached.");
  }
}
