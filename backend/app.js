const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const { errors } = require("celebrate");


const app = express();
const cardsRoutes = require('./routes/cards');
const usersRoutes = require('./routes/users');
const {
  login, createUser
} = require("./controllers/users");
const auth = require("./middleware/auth");
const { requestLogger, errorLogger } = require("./middleware/logger");

app.use(cors());
app.options("*", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://localhost:27017/mydb");

// app.use((req, res, next) => {
//   req.user = {
//     _id: '63a93748e5ff3a8f361e5682',
//   };

//   next();
// });
app.use(requestLogger);
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("El servidor va a caer");
  }, 0);
}); 
app.post("/signin", login);
app.post("/signup", createUser);
app.use(auth);

app.use('/', cardsRoutes);
app.use('/', usersRoutes);



const notFound = (req, res) => {
  res.status(404);
  res.send({ message: 'Recurso solicitado no encontrado' });
};
app.get('/', notFound);

app.get('*', notFound);

app.use(errors());

app.use(errorLogger);

app.use((err, req, res, next) => {
  res.send({ message: err.message });
});


const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  // si todo funciona bien, la consola mostrará qué puerto está detectando la aplicación
  console.log(`App listening at port ${PORT}`);
});
