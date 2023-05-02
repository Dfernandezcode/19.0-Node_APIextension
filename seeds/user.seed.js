const mongoose = require("mongoose");
const { connect } = require("../db.js");
const { User } = require("../models/User.js");
const { faker } = require("@faker-js/faker");

const userList = [
  { firstName: "Fran", lastName: "Linde", phone: "123123123" },
  { firstName: "Edu", lastName: "Cuadrado" },
  { firstName: "Gon", lastName: "Fernández", phone: "666777888" },
];

// Creamos usuarios adicionales
for (let i = 0; i < 50; i++) {
  const newUser = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    phone: faker.phone.number("+34 91 ### ## ##"),
  };

  // console logs are not always the best way to debug. Not worst, not always muost useful.
  console.log(newUser.form);
  userList.push(newUser);
}

connect().then(() => {
  console.log("Tenemos conexión");

  // Borrar datos
  User.collection.drop().then(() => {
    console.log("Usuarios eliminados");

    // Añadimos usuarios
    const documents = userList.map((user) => new User(user));
    User.insertMany(documents)
      .then(() => console.log("Datos guardados correctamente!"))
      .catch((error) => console.error(error))
      .finally(() => mongoose.disconnect());
  });
});
