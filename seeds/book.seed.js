// how to add to DB
const mongoose = require("mongoose");
const { Types } = mongoose;
const { connect } = require("../db.js");
const { Book } = require("../models/Book.js");
const { Author } = require("../models/Author.js");
const { faker } = require("@faker-js/faker");

const bookSeed = async () => {
  try {
    await connect();
    console.log("Tenemos conexión");

    // Borrar datos
    await Book.collection.drop();
    console.log("Coches eliminados");

    // create author
    const author = new Author({
      name: "J.K. Rowling",
      country: "United Kingdom",
    });

    const authorDocument = await author.save();

    const bookList = [
      {
        title: "Harry Potter",
        author: authorDocument,
        pages: 543,
        publisher: {
          name: "Bloomsbury",
          country: "United Kingdom",
        },
      },
      {
        title: "1984",
        author: authorDocument,
        pages: 328,
        publisher: {
          name: "Secker & Warburg",
          country: "United Kingdom",
        },
      },
      {
        title: "To Kill a Mockingbird",
        author: authorDocument,
        pages: 281,
        publisher: {
          name: "Random House",
          country: "USA",
        },
      },
    ];

    // Creamos coches adicionales
    for (let i = 0; i < 50; i++) {
      const newBook = {
        title: faker.random.words(),
        author: new Types.ObjectId(),
        pages: faker.random.numeric(3),
        publisher: {
          name: faker.name.fullName(),
          country: faker.address.country(),
        },
      };
      bookList.push(newBook);
    }

    // Añadimos books
    const documents = bookList.map((book) => new Book(book));
    await Book.insertMany(documents);

    console.log("Datos guardados correctamente!");
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
};

bookSeed(); // ESPERO VER: "Tenemos conexión", "Coches eliminados" y "Datos guardados correctamente!"

// create 50 more.
/*
for (let i = 0; i < 50; i++) {
  const newBook = {
    title: faker.lorem.words(),
    author: `${faker.name.firstName()} ${faker.name.lastName()}`,
    pages: faker.datatype.number(1000),
  };
  bookList.push(newBook);
}
*/
