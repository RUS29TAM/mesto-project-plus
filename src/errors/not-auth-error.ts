import { NOT_AUTH_ERROR } from '../utils/constants';

class NotAuthError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = NOT_AUTH_ERROR;
  }
}

export default NotAuthError;
