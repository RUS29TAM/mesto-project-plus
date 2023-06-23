/* валидатор пользователей */
import { Joi, Segments, celebrate } from "celebrate";
import { urlRegExp } from "../utils/constants";

export const getUserByIdValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    userId: Joi.string().length(24).hex().required()
      .messages({
        "string.base": "userId должен быть строкой",
        "string.empty": "userId не должен быть пустым",
        "string.length": "userId должен быть длиной {#limit} символов",
        "string.hex": "userId должен быть шестнадцатеричным числом",
        "string.required": "userId обязателен для заполнения",
      })
  }),
});

export const updateCurrentUserDataValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).required()
      .messages({
        "string.empty": "Поле 'Имя' не должно быть пустым",
        "string.min": "Поле 'Имя'  должно содержать не менее {#limit} символов",
        "string.max": "Поле 'Имя'  должно содержать не более {#limit} символов",
        "string.required": "Поле Имя обязателено для заполнения",
      }),
    about: Joi.string().min(2).max(200).required()
      .messages({
        "string.empty": "Поле 'about' не должно быть пустым",
        "string.min": "Поле 'about'  должно содержать не менее {#limit} символов",
        "string.max": "Поле 'about'  должно содержать не более {#limit} символов",
        "string.required": "Поле 'about' обязателено для заполнения",
      }),
  }),
});

export const createUserValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30)
      .messages({
        "string.empty": "Поле 'Имя' не должно быть пустым",
        "string.min": "Поле 'Имя'  должно содержать не менее {#limit} символов",
        "string.max": "Поле 'Имя'  должно содержать не более {#limit} символов",
      }),
    about: Joi.string().min(2).max(200)
      .messages({
        "string.empty": "Поле 'about' не должно быть пустым",
        "string.min": "Поле 'about'  должно содержать не менее {#limit} символов",
        "string.max": "Поле 'about'  должно содержать не более {#limit} символов",
      }),
    avatar: Joi.string().pattern(urlRegExp).messages({
      "string.empty": "Поле 'Сслыка на аватар' не должно быть пустым",
      "string.pattern.base": "Поле 'Сслыка на аватар' должно быть валидным URL-адресом",
    }),
  }),
});

export const updateCurrentUserAvatarValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string().pattern(urlRegExp).required()
  }),
});
