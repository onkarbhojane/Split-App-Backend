const Expense = require('../models/Expense');

const getUniquePeople = async () => {
  const expenses = await Expense.find();
  const peopleSet = new Set();
  expenses.forEach(exp => {
    peopleSet.add(exp.paid_by);
    exp.splits?.forEach(s => peopleSet.add(s.person));
  });
  return Array.from(peopleSet);
};

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json({ success: true, data: expenses });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.addExpense = async (req, res) => {
  try {
    const { amount, description, paid_by, splits } = req.body;
    console.log(description+" djsnvnlksdf"+description.length())
    if (!amount || description.length()>0 || !paid_by)
      return res.status(400).json({ success: false, message: "Missing required fields" });

    if (amount <= 0) return res.status(400).json({ success: false, message: "Amount must be positive" });

    const expense = new Expense({ amount, description, paid_by, splits });
    await expense.save();
    res.status(201).json({ success: true, data: expense, message: "Expense added successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const id = req.params.id;
    const updated = await Expense.findByIdAndUpdate(id, req.body, { new: true });

    if (!updated)
      return res.status(404).json({ success: false, message: "Expense not found" });

    res.json({ success: true, data: updated, message: "Expense updated successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const deleted = await Expense.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ success: false, message: "Expense not found" });

    res.json({ success: true, data: deleted, message: "Expense deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getPeople = async (req, res) => {
  try {
    const people = await getUniquePeople();
    res.json({ success: true, data: people });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getBalances = async (req, res) => {
  try {
    const expenses = await Expense.find();
    const balances = {};

    expenses.forEach(exp => {
      const payer = exp.paid_by;
      const total = exp.amount;

      let peopleInvolved = exp.splits?.length > 0 ? exp.splits.map(s => s.person) : [payer];
      const perHead = total / (exp.splits?.length || 1);

      balances[payer] = (balances[payer] || 0) + total;

      exp.splits?.forEach(split => {
        balances[split.person] = (balances[split.person] || 0) - (split.share ?? perHead);
      });
    });

    res.json({ success: true, data: balances });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getSettlements = async (req, res) => {
  try {
    const balances = {};
    const expenses = await Expense.find();

    expenses.forEach(exp => {
      const payer = exp.paid_by;
      const total = exp.amount;

      const peopleInvolved = exp.splits?.length > 0 ? exp.splits.map(s => s.person) : [payer];
      const perHead = total / (exp.splits?.length || 1);

      balances[payer] = (balances[payer] || 0) + total;
      exp.splits?.forEach(split => {
        balances[split.person] = (balances[split.person] || 0) - (split.share ?? perHead);
      });
    });

    let creditors = [], debtors = [];
    for (const person in balances) {
      const balance = Math.round(balances[person] * 100) / 100;
      if (balance > 0) creditors.push({ person, amount: balance });
      else if (balance < 0) debtors.push({ person, amount: -balance });
    }

    const transactions = [];
    let i = 0, j = 0;
    while (i < debtors.length && j < creditors.length) {
      const minAmount = Math.min(debtors[i].amount, creditors[j].amount);
      transactions.push({
        from: debtors[i].person,
        to: creditors[j].person,
        amount: minAmount
      });

      debtors[i].amount -= minAmount;
      creditors[j].amount -= minAmount;

      if (debtors[i].amount === 0) i++;
      if (creditors[j].amount === 0) j++;
    }

    res.json({ success: true, data: transactions });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
