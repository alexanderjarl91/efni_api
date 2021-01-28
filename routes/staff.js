const express = require('express');
const router = express.Router();
const Staff = require('../models/Staff');

// Get all products
router.get('/', async (req, res) => {
  try {
    const staff = await Staff.find();
    res.json(staff);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;