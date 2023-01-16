const router = require('express').Router();
const { celebrate, Joi } = require("celebrate");
const validator = require('validator');
const {
  getUsers, getUserById, createUser, updateProfile, updateAvatar
} = require('../controllers/users');

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post(
  "/users",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
      password: Joi.string().required().min(2),
    }),
  }),
  createUser
);
router.patch(
  "/users/me",
  updateProfile
);
router.patch(
  "/users/me/avatar",
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().custom(validateURL),
    }),
  }),
  updateAvatar
);
router.get('/users/me', getUsers);


module.exports = router;
