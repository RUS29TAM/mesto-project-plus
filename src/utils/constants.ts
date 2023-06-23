import * as http2 from 'http2';

export const defaultUser = {
  name: 'defaultName',
  about: 'defaultAbout',
  avatar: 'https://moysite.ru/wp-content/uploads/2023/02/jandeks.praktikum-logo.jpg',
};

export const urlRegExp: RegExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/;
export const DB_URL = 'mongodb://127.0.0.1:27017/mestodb';

export const INTERNAL_SERVER_ERROR = http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
export const NOT_FOUND_ERROR = http2.constants.HTTP_STATUS_NOT_FOUND;
export const BAD_REQUEST = http2.constants.HTTP_STATUS_BAD_REQUEST;
export const OK = http2.constants.HTTP_STATUS_OK;
