const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  ingredients: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
});

module.exports = Recipe = mongoose.model("recipe", RecipeSchema);
