const express = require('express');
const mongoose = require('mongoose');

const app = express();
const cardsRoutes = require('./routes/cards');
const usersRoutes = require('./routes/users');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/mydb");

app.use((req, res, next) => {
  req.user = {
    _id: '63a93748e5ff3a8f361e5682',
  };

  next();
});

app.use('/', cardsRoutes);
app.use('/', usersRoutes);

const notFound = (req, res) => {
  res.status(404);
  res.send({ message: 'Recurso solicitado no encontrado' });
};
app.get('/', notFound);

app.get('*', notFound);

const { PORT = 3000 } = process.env;

app.listen(PORT);
