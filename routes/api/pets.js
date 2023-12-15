const express = require('express');
const router = express.Router();
const petsCtrl = require('../../controllers/api/pets');

// Define a route to handle creating a new pet
router.post('/', petsCtrl.create);
// Define a route to handle getting all pets
router.get('/', petsCtrl.index);
// Define a route to handle getting one pet
router.get('/:id', petsCtrl.getById);
// Define a route to handle updating a pet
router.put('/:id', petsCtrl.update);
// Define a route to handle deleting a pet
router.delete('/:id', petsCtrl.delete);



module.exports = router;