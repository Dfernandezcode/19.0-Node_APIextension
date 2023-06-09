const express = require("express");
const { cryptoRouter } = require("./routes/crypto.routes.js");
const { bookRouter } = require("./routes/book.routes.js");
const { authorRouter } = require("./routes/author.routes.js");
// Async-Await function to solve error 500 in VERCEL

// REMEMBER - all Await functions MUST be in Async function.
const main = async () => {
  // Conexión a la BBDD
  const { connect } = require("./db.js");
  await connect();

  // Configuración del server
  const PORT = 3000;
  const server = express();
  server.use(express.json());
  server.use(express.urlencoded({ extended: false }));

  // Rutas
  const router = express.Router();
  router.get("/", (req, res) => {
    res.send("Esta es la home de nuestra API");
  });
  router.get("*", (req, res) => {
    res.status(404).send("Lo sentimos :( No hemos encontrado la página solicitada.");
  });

  // Usamos las rutas
  server.use("/book", bookRouter);
  server.use("/author", authorRouter);
  server.use("/crypto", cryptoRouter);
  // server.use("/book", carRouter);
  // server.use("/crypto", userRouter);
  server.use("/", router);

  server.listen(PORT, () => {
    console.log(`Server levantado en el puerto ${PORT}`);
  });
};

main();

// Router config below causes VERCEL connection errors (500)
/*
// BBDD connection
const { connect } = require("./db.js");
connect();

// Express router creation:
const PORT = 3000;
const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

// Delegate all /book routes.
const router = express.Router();
router.get("/", (req, res) => {
  res.send("Welcome to our API homepage. NodeJS @TheValley");
});

router.get("*", (req, res) => {
  res.status(404).send("Sorry we couldn't find the page requested - (Error 404).");
});

// Using these routes:
// ORDER IS IMPORTANT! - MOST RESTRICTIVE to LEAST.

server.use("/crypto", cryptoRouter);
server.use("/book", bookRouter);
server.use("/", router);
server.listen(PORT, () => {
  console.log(`Server online using ${PORT}`);
});
*/

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
++Añade el objeto publisher (editorial) dentro de los libros
Corrige el fichero index.js para que sea asíncrono y espere a la conexión para seguir ejecutando el código con await connect();
Modifica tu código para que el nombre de la base de datos lo lea de una variable de entorno, en local usa la de desarrollo (DEVELOPMENT)
Añade el fichero vercel.json y despliega tu proyecto en Vercel haciendo que use la base de datos de PRODUCTION
*/

// Add environment variables to VERCEL deployment!
