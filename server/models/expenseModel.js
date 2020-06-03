var mongoose = require("mongoose");

var expenseSchema = new mongoose.Schema({
  title: { type: String, default: null },
  description: { type: String, default: null },
  amount: { type: Number, default: null },
  type: { type: String, enum: ["income", "spend"], default: "income" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("expenseModel", expenseSchema);
