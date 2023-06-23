import { Router } from "express";
import usersRoutes from "./users-routes";
import cardsRoutes from "./cards-routes";
import NotFoundError from "../errors/not-found-error";

const router = Router();

router.use("/user", usersRoutes);
router.use("/cards", cardsRoutes);

router.use((req, res, next) => {
  next(new NotFoundError("Не существующая страница"));
});

export default router;
