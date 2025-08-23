const express = require('express');
const router = express.Router();

// ✅ Paste this line below your require statements
const menulist = require('../data/Menudata');

// GET route to return the menu list
router.get('/', (req, res) => {
  res.json(menulist);
});

module.exports = router;
