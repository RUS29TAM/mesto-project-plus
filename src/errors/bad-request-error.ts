import { BAD_REQUEST } from '../utils/constants';

class BadRequestError extends Error {
  public respStatusCode: number;

  constructor(message: string) {
    super(message);
    this.respStatusCode = BAD_REQUEST;
  }
}

export default BadRequestError;
