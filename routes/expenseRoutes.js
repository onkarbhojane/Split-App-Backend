const express = require('express');
const router = express.Router();
const {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
  getPeople,
  getBalances,
  getSettlements
} = require('../controllers/expenseController');

router.get('/expenses', getExpenses);
router.post('/expenses', addExpense);
router.put('/expenses/:id', updateExpense);
router.delete('/expenses/:id', deleteExpense);

router.get('/people', getPeople);
router.get('/balances', getBalances);
router.get('/settlements', getSettlements);

module.exports = router;
