const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  paid_by: { type: String, required: true },
  splits: [{ person: String, share: Number }],
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Expense', expenseSchema);
