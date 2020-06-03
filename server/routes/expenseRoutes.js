var express = require("express");
var router = express.Router();
var expenseModel = require("../models/expenseModel.js");

// Get All Expenses
router.get("/", function(req, res, next) {
  expenseModel.find(function(err, expenses) {
    if (err) return next(err);
    res.json({ status: true, data: expenses });
  });
});

// Save Expense
router.post("/", function(req, res, next) {
  expenseModel.create(req.body, function(err, post) {
    if (err) return next(err);
    res.json({ status: true, data: post });
  });
});

// Get Single Expense
router.get("/edit/:id", function(req, res, next) {
  expenseModel.findById(req.params.id, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// Update Expense
router.put("/:id", function(req, res, next) {
  expenseModel.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
    if (err) return next(err);
    res.json({ status: true, data: post });
  });
});

// Delete Expense
router.delete("/:id", function(req, res, next) {
  expenseModel.findByIdAndRemove(req.params.id, req.body, function(
    err,
    expenses
  ) {
    if (err) return next(err);
    res.json({ status: true, data: expenses });
  });
});

// Get Expense Report
router.get("/report", function(req, res, next) {
  expenseModel
    .aggregate([
      {
        $group: {
          _id: "$type",
          totalSaleAmount: { $sum: "$amount" }
        }
      }
    ])
    .then(function(response) {
      let reportObj = {};
      if (response) {
        response.forEach((value, key) => {
          reportObj[value._id] = value.totalSaleAmount;
        });
      }
      res.json({ status: true, data: reportObj });
    })
    .catch(error => {
      console.log(error, "error=====");
    });
});

module.exports = router;
