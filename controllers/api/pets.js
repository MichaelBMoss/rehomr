const Pet = require('../../models/pet/pet');

module.exports = {
    create,
    index,
    getOne,
    update,
    delete: deleteOne,

};

async function create(req, res) {
    try {
        const newPet = new Pet(req.body);
        const savedPet = await newPet.save();
        res.status(201).json(savedPet);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function index(req, res) {
    try {
        const pets = await Pet.find({});
        res.status(200).json(pets);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getOne(req, res) {
    try {
        const pet = await Pet.findById(req.params.id);
        res.status(200).json(pet);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

