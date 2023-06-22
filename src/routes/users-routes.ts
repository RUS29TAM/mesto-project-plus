import { Router } from "express";
import {
  createUser,
  getCurrentUser,
  getUserById,
  getUsers, updateCurrentUserAvatar, updateCurrentUserData,
} from "../controllers/users-controller";
import {
  createUserValidation,
  getUserByIdValidation, updateCurrentUserAvatarValidation,
  updateCurrentUserDataValidation
} from "../validators/users-validator";

const router = Router();
router.get("/", getUsers); // возвращает всех пользователей из базы;
router.get("/me", getCurrentUser); // возвращает текущего пользователя ;
router.get("/:userId", getUserByIdValidation, getUserById); // валидирует и возвращает пользователя по _id ;
router.post("/", createUserValidation, createUser); // валидирует и создаёт пользователя с переданными в теле запроса name , about и avatar ;
router.patch("/me", updateCurrentUserDataValidation, updateCurrentUserData); // валидирует и обновляет профиль пользователя;
router.patch("/me/avatar", updateCurrentUserAvatarValidation, updateCurrentUserAvatar); // валидирует и обновляет аватар пользователя;

export default router;
