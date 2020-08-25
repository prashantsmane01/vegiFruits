const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

//const Product = require('../models/Products');
const Product = require('../models/Products');

// @route     GET api/products
// @desc      Get all products
// @access    Private
router.get('/', auth, async (req, res) => {
  try {
    const products = await Product.find({}).sort({
      date: -1,
    });
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
