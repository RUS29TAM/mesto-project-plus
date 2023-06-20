class BadRequestError extends Error {
  public respStatusCode: number;

  constructor(message: string) {
    super(message);
    this.respStatusCode = 400;
  }
}

export default BadRequestError;
