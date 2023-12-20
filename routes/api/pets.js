const express = require('express');
const router = express.Router();
const petsCtrl = require('../../controllers/api/pets');
const verifyToken = require('../../middleware/verifyToken');

// Define a route to handle creating a new pet (protected)
router.post('/', verifyToken, petsCtrl.create);

// Define a route to handle getting all pets
router.get('/', petsCtrl.index);

// Define a route to handle getting one pet
router.get('/:id', petsCtrl.getById);

// Define a route to handle updating a pet (protected)
router.put('/:id', verifyToken, petsCtrl.update);

// Define a route to handle deleting a pet (protected)
router.delete('/:id', verifyToken, petsCtrl.deletePet);

// Get pets that belong to this org (assuming this needs protection)
router.get('/orgspets/:id', petsCtrl.getOrgsPets);

module.exports = router;
