const express = require('express');
const router = express.Router();
const petsCtrl = require('../../controllers/api/pets');

// Import your Pet model if not already imported
const Pet = require('../../models/pet/pet');
const pet = require('../../models/pet/pet');

// Define a route to handle creating a new pet
router.post('/', async (req, res) => {
  try {
    const newPet = new Pet(req.body);
    const savedPet = await newPet.save();
    res.status(201).json(savedPet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Define a route to handle getting one pet
router.get('/:id', petsCtrl.getOne);


module.exports = router;
