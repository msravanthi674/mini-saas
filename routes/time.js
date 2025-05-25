// routes/time.js
const express = require('express');
const router = express.Router();
const db = require('../db/database');
const auth = require('../middleware/authMiddleware');

// Create time log
router.post('/time-logs', auth, (req, res) => {
  const { start_time, end_time, description } = req.body;
  const userId = req.user.id;

  db.run(`
    INSERT INTO time_logs (user_id, start_time, end_time, description)
    VALUES (?, ?, ?, ?)
  `, [userId, start_time, end_time, description], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID });
  });
});

// Get time logs
router.get('/time-logs', auth, (req, res) => {
  const userId = req.user.id;

  db.all("SELECT * FROM time_logs WHERE user_id = ?", [userId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

module.exports = router;
