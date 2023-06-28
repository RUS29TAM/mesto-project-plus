import * as http2 from 'http2';

export const defaultUser = {
  name: 'Жак-Ив Кусто',
  about: 'Исследователь',
  avatar: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
};

export const urlRegExp: RegExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/;
export const emailRegExp: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const DB_URL = 'mongodb://127.0.0.1:27017/mestodb';

export const INTERNAL_SERVER_ERROR = http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
export const NOT_FOUND_ERROR = http2.constants.HTTP_STATUS_NOT_FOUND;
export const BAD_REQUEST = http2.constants.HTTP_STATUS_BAD_REQUEST;
export const OK = http2.constants.HTTP_STATUS_OK;
export const NOT_AUTH_ERROR = http2.constants.HTTP_STATUS_UNAUTHORIZED;
export const CONFLICT_ERROR = http2.constants.HTTP_STATUS_CONFLICT;
export const CREATED = http2.constants.HTTP_STATUS_CREATED;
export const DUPLICATE_KEY_ERROR = 11000;
