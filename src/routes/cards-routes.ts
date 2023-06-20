import { Router } from "express";

const router = Router();

router.get("/", getCards);
router.post("/", createCard);

router.delete("/:cardId", deleteCardById);

router.put("/:cardId/likes", likeCardById);
router.delete("/:cardId/likes", dislikeCardById);
