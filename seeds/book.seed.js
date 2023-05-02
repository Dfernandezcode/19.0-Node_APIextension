// how to add to DB
const mongoose = require("mongoose");
const { connect } = require("../db.js");
const { Book } = require("../models/Book.js");
// const { faker } = require("@faker-js/faker");

const bookList = [
  {
    title: "Harry Potter",
    author: "J.K. Rowling",
    pages: 543,
  },
  {
    title: "1984",
    author: "George Orwell",
    pages: 328,
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    pages: 281,
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    pages: 180,
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    pages: 279,
  },
  {
    title: "For The Emperor (Ciaphas Cain Book 1)",
    author: "Alex Stewart",
    pages: 416,
  },
  {
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling",
    pages: 341,
  },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    author: "J.R.R. Tolkien",
    pages: 480,
  },
  {
    title: "The Hunger Games",
    author: "Suzanne Collins",
    pages: 374,
  },
  {
    title: "The Da Vinci Code",
    author: "Dan Brown",
    pages: 454,
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    pages: 277,
  },
  {
    title: "The Hitchhiker's Guide to the Galaxy",
    author: "Douglas Adams",
    pages: 193,
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    pages: 310,
  },
  {
    title: "Brave New World",
    author: "Aldous Huxley",
    pages: 288,
  },
  {
    title: "The Picture of Dorian Gray",
    author: "Oscar Wilde",
    pages: 254,
  },
  {
    title: "The Girl with the Dragon Tattoo",
    author: "Stieg Larsson",
    pages: 465,
  },
  {
    title: "The Adventures of Sherlock Holmes",
    author: "Arthur Conan Doyle",
    pages: 307,
  },
  {
    title: "The Lion, the Witch and the Wardrobe",
    author: "C.S. Lewis",
    pages: 206,
  },
  {
    title: "Moby Dick",
    author: "Herman Melville",
    pages: 625,
  },
  {
    title: "Frankenstein",
    author: "Mary Shelley",
    pages: 280,
  },
  {
    title: "The Adventures of Tom Sawyer",
    author: "Mark Twain",
    pages: 223,
  },
  {
    title: "The Count of Monte Cristo",
    author: "Alexandre Dumas",
    pages: 1276,
  },
  {
    title: "The Road",
    author: "Cormac McCarthy",
    pages: 287,
  },
  {
    title: "The Wind-Up Bird Chronicle",
    author: "Haruki Murakami",
    pages: 607,
  },
  {
    title: "The Old Man and the Sea",
    author: "Ernest Hemingway",
    pages: 127,
  },
  {
    title: "The Kite Runner",
    author: "Khaled Hosseini",
    pages: 372,
  },
  {
    title: "Crime and Punishment",
    author: "Fyodor Dostoevsky",
    pages: 671,
  },
  {
    title: "One Hundred Years of Solitude",
    author: "Gabriel Garcia Marquez",
    pages: 417,
  },
  {
    title: "Wuthering Heights",
    author: "Emily Bronte",
    pages: 342,
  },
  {
    title: "The Bell Jar",
    author: "Sylvia Plath",
    pages: 244,
  },
];

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
console.log(bookList);

// connect and create map of bookList to add to database
connect().then(() => {
  console.log("Connected");

  // Delete data
  Book.collection.drop().then(() => {
    console.log("Books deleted");

    // Add books
    const documents = bookList.map((book) => new Book(book));

    Book.insertMany(documents)
      .then(() => console.log("Datos guardados correctamente!"))
      .catch((error) => console.error(error))
      .finally(() => mongoose.disconnect());
  });
});
