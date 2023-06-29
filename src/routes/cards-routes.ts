import { Router } from 'express';
import {
  getCards,
  likeCardById,
  dislikeCardById,
  deleteCardById,
  createCard,
} from '../controllers/cards-controller';
import {
  createCardValidation,
  deleteCardByIdValidation,
  dislikeCardByIdValidation,
  likeCardByIdValidation,
} from '../validators/cards-validator';

const router = Router();

router.get('/', getCards);
router.post('/', createCardValidation, createCard);
router.delete('/:cardId', deleteCardByIdValidation, deleteCardById);
router.put('/:cardId/likes', likeCardByIdValidation, likeCardById);
router.delete('/:cardId/likes', dislikeCardByIdValidation, dislikeCardById);

export default router;
