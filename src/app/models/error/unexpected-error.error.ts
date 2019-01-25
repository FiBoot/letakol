
export class UnexpectedError extends Error {
  constructor(error: Error) {
    super('An unexpected error as occured. Please contact admin.');
    this.name = 'Unexpected Error';
    this.stack = error.stack;
  }
}
