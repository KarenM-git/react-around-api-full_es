const mongoose = require('mongoose');


const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Jacques Cousteau",
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Explorador",
  },
  avatar: {
    type: String,
    validate: {
      validator(v) {
        return /^((http[s]?):\/\/)(www.)?[a-z0-9\-]+\.[a-z]+(\/[a-zA-Z0-9\._~:\/*\?%#\[\]@!\$&'\(\)\*\+,;=]*)*#?\/?$/.test(
          v
        );
      },
      message: "Invalid Url",
    },
    default: "https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg",
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        validator.isEmail(v);
      },
      message: "Email invalido",
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
