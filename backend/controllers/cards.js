const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .orFail()
    .then((cards) => res.send(cards))
    .catch(() => res.status(500).send('Ocurrio un error'));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send(err.message);
        return;
      }
      res.status(500).send('Ocurrio un error');
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send('Ocurrio un error'));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // agrega _id al array si aún no está ahí
    { new: true },
  )
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send('Ocurrio un error'));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // elimina _id del array
    { new: true },
  )
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send('Ocurrio un error'));
};
