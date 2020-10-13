const db = require('../db');
const express = require('express');
const router = express.Router();

// export our router to be mounted by the parent application
module.exports = router;

router.post('/add', async (req, res) => {
  res.send('add a campaign');
});

router.get('/:id', async (req, res) => {
  res.send('get a campaign');
});

router.post('/:id/join', async (req, res) => {
  res.send('join a campaign');
});
