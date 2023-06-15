const express = require('express');
const router = express.Router();
const db = require('../db.js');



router.post('/expenses/create', (req, res) => {
    const { name, amount, date } = req.body;
    console.log(req.body);

    if (!name) {
        return res.status(400).json({ error: 'ERROR' }); 
    }

    const formattedDate = new Date(date).toDateString();

    const expense = {
        name,
        amount,
        date: formattedDate
    };

    db.add(expense);
    res.status(200).json(expense);
});


router.get('/expenses/get-all', (req, res) => {
  res.json(db.get());
});


router.post('/expenses/search', (req, res) => {
  const { date } = req.body;

  if (!date) {
      return res.status(400).json({ error: 'ERROR' });
  }

  expenses = db.get()
  const filteredExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date).toDateString();
      return expenseDate === date;
  });

  

  res.json(filteredExpenses);
});


router.post('/limit/add', (req, res) => {
  const { limit } = req.body;

  if (!limit) {
      return res.status(400).json({ error: 'ERROR' });
  }
  if (typeof limit !== 'number') {
      return res.status(400).json({ error: 'ERRORRRR' });
  }

  db.setLimit(limit);
  res.sendStatus(200);
});


router.get('/limit/show', (req, res) => {
  limit = db.getLimit()
  res.json({ limit: limit });
});

module.exports = router;

router.post('/limit/set', function(req, res) {
  const limit = req.body.limit;
  if (typeof limit !== 'number' || limit < 0) {
      return res.status(400).json({ error: 'ERORRRRRRRRR' });
  }
  db.setLimit(limit);
  res.status(200).json({ limit });
});

router.get('/limit/get', function(req, res) {
  res.json({ limit: db.getLimit() });
});

module.exports = router;

