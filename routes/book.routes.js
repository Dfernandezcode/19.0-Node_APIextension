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
    // Asi leemos query params
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const books = await Book.find()
      .limit(limit)
      .skip((page - 1) * limit);

    // LIMIT 10, PAGE 1 -> SKIP = 0
    // LIMIT 10, PAGE 2 -> SKIP = 10
    // LIMIT 10, PAGE 3 -> SKIP = 20
    // ...

    // Num total de elementos
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

// search functionality: - CRUD: READ
router.get("/book", (req, res) => {
  Book.find()
    .then((books) => res.json(books))
    .catch((error) => res.status(500).json(error));
});

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
router.post("/book", async (req, res) => {
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
