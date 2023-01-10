const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    validate: {
      validator(v) {
        return /^((http[s]?):\/\/)(www.)?[a-z0-9\-]+\.[a-z]+(\/[a-zA-Z0-9\._~:\/*\?%#\[\]@!\$&'\(\)\*\+,;=]*)*#?\/?$/.test(
          v
        );
      },
      message: 'Invalid link',
    },
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'user',
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
