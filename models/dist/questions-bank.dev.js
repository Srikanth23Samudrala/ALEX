"use strict";

var mongoose = require('mongoose');

var questionBank = new mongoose.Schema({
  questionId: {
    type: String,
    required: true
  },
  questions: {
    type: Array,
    required: true
  }
});
module.exports = mongoose.model('questionBank', questionBank);