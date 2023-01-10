const bcrypt = require("bcryptjs");
const User = require("../models/user");

module.exports.getUsers = (req, res) => {
  User.find({})
    .orFail()
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: "Ocurrio un Error" }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(404).send("Usuario no encontrado");
        return;
      }
      res.status(500).send({ message: "Ocurrio un error" });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
User.create({ name, about, avatar, email, hash });
   })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send(err.message);
        return;
      }
      res.status(500).send({ message: "Ocurrio un error" });
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: true,
    }
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send(err.message);
        return;
      }
      res.status(500).send({ message: "Ocurrio un error" });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: true,
    }
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send(err.message);
        return;
      }
      res.status(500).send({ message: "Ocurrio un error" });
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error("Incorrect password or email"));
      }
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {

        return Promise.reject(new Error("Incorrect password or email"));
      }

      res.send({ message: "¡Todo bien!" });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};
