const router = require('express').Router();
const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const { Joi, celebrate } = require('celebrate');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.post(
  "/cards",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      link: Joi.string().required().custom(validateURL),
    }),
  }),
  createCard
);
router.delete('/:id', deleteCard);
router.put('/cards/:cardId/likes', likeCard);
router.delete('/cards/:cardId/likes', dislikeCard);

module.exports = router;
