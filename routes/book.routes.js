// express req (npm i express)
const express = require("express");
// Models
const { Book } = require("../models/Book.js");
// Routers - book only.
const router = express.Router();

// Home Route: - CRUD: READ
router.get("/", async (req, res) => {
  // How to read query.params
  console.log(req.query);
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const books = await Book.find()
      .limit(limit)
      .skip((page - 1) * limit);

    const totalElements = await Book.countDocuments();

    const response = {
      totalItems: totalElements,
      totalPages: Math.ceil(totalElements / limit),
      currentPage: page,
      data: books,
    };

    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get by Title
router.get("/title/:title", async (req, res) => {
  const title = req.params.title;

  try {
    // const book = await Book.find({ title: title });
    const book = await Book.find({ title: new RegExp("^" + title.toLowerCase(), "i") });
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// Endpoint Book creation: - CRUD: CREATE
router.post("/", async (req, res) => {
  console.log(req.headers);
  try {
    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      pages: req.body.pages,
    });

    const createdBook = await book.save();
    return res.status(201).json(createdBook);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Book delete: - CRUD: DELETE
router.delete("/:id", async (req, res) => {
  try {
    // returns deleted Book
    const id = req.params.id;
    const bookDeleted = await Book.findByIdAndDelete(id);
    if (bookDeleted) {
      res.json(bookDeleted);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// Book update: - CRUD: UPDATE
// (req.body) is an object with all info to be updated.
// { new: true } - is a parameter that will return "new updated database entry"

router.put("/:id", async (req, res) => {
  try {
    // returns deleted book
    const id = req.params.id;
    const bookUpdated = await Book.findByIdAndUpdate(id.req.body, { new: true });
    if (bookUpdated) {
      res.json(bookUpdated);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = { bookRouter: router };

// get by ID
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findById(id);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// TO DOS
/*
Cambiar todas las promesas por async/await
  ++Search by title
  ++Search by ID
  ++Get books
  ++ Create book
  - Update book
  ++ Delete book by ID

Añadir el fichero launch.json y depurar tu código para aprender a usar el modo debug de VSCode
Añade el objeto publisher (editorial) dentro de los libros
Corrige el fichero index.js para que sea asíncrono y espere a la conexión para seguir ejecutando el código con await connect();
Modifica tu código para que el nombre de la base de datos lo lea de una variable de entorno, en local usa la de desarrollo (DEVELOPMENT)
Añade el fichero vercel.json y despliega tu proyecto en Vercel haciendo que use la base de datos de PRODUCTION
*/
