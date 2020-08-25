const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Categories = require('../models/Categories');

// @route     GET api/categories
// @desc      Get all categories
// @access    Private
router.get('/', auth, async (req, res) => {
  try {
    const categories = await Categories.find({}).sort({
      name: -1,
    });
    res.json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST api/categories
// @desc      Add new category
// @access    Private
router.post(
  '/',
  [auth, [check('name', 'Name is required').not().isEmpty().trim(), check('isActive', 'isActive is required').not().isEmpty().trim()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, isActive } = req.body;

    try {
      const newCategory = new Categories({
        name,
        description,
        isActive,
      });

      const cat = await newCategory.save();

      res.json(cat);
    } catch (err) {
      console.error(err.message);
      res.status(500).send(err.message);
    }
  }
);

// @route     PUT api/category/:id
// @desc      Update category
// @access    Private
router.put('/:id', auth, async (req, res) => {
  const { name, description, isActive } = req.body;

  // Build cat object
  const categoryFields = {};
  if (name) categoryFields.name = name;
  if (description) categoryFields.description = description;
  if (isActive) categoryFields.isActive = isActive;

  try {
    let category = await Categories.findById(req.params.id);

    if (!category) return res.status(404).json({ msg: 'category not found' });
    category = await Contact.findByIdAndUpdate(req.params.id, { $set: categoryFields }, { new: true });

    res.json(category);
  } catch (err) {
    console.error(er.message);
    res.status(500).send('Server Error');
  }
});

// @route     DELETE api/contacts/:id
// @desc      Delete contact
// @access    Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: 'Contact not found' });

    // Make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Contact.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Contact removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
