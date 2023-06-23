/* валидатор карточек */
import { Joi, Segments, celebrate } from "celebrate";
import { urlRegExp } from "../utils/constants";

export const createCardValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).required()
      .messages({
        "string.empty": "Поле 'Имя' не должно быть пустым",
        "string.min": "Поле 'Имя'  должно содержать не менее {#limit} символов",
        "string.max": "Поле 'Имя'  должно содержать не более {#limit} символов",
        "any.required": "Поле 'Имя' обязательно для заполнения",
      }),
    link: Joi.string().pattern(urlRegExp).required().messages({
      "string.empty": "Поле 'Сслыка на изображение карточки' не должно быть пустым",
      "string.pattern.base": "Поле 'Сслыка на изображение карточки' должно быть валидным URL-адресом",
      "any.required": "Поле 'Сслыка на изображение карточки' обязательно для заполнения",
    }),
  }),
});

export const deleteCardByIdValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required()
      .messages({
        "string.base": "cardId должен быть строкой",
        "string.empty": "cardId не должен быть пустым",
        "string.length": "cardId должен быть длиной {#limit} символов",
        "string.hex": "cardId должен быть шестнадцатеричным числом",
        "string.required": "cardId обязателен для заполнения",
      })
  }),
});

export const likeCardByIdValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required()
      .messages({
        "string.base": "cardId должен быть строкой",
        "string.empty": "cardId не должен быть пустым",
        "string.length": "cardId должен быть длиной {#limit} символов",
        "string.hex": "cardId должен быть шестнадцатеричным числом",
        "string.required": "cardId обязателен для заполнения",
      })
  }),
});

export const dislikeCardByIdValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required()
      .messages({
        "string.base": "cardId должен быть строкой",
        "string.empty": "cardId не должен быть пустым",
        "string.length": "cardId должен быть длиной {#limit} символов",
        "string.hex": "cardId должен быть шестнадцатеричным числом",
        "string.required": "cardId обязателен для заполнения",
      })
  }),
});
