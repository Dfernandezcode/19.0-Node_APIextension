const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creamos el schema del usuario
const authorSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Author = mongoose.model("Author", authorSchema);
module.exports = { Author };
