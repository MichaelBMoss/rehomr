const Pet = require('../../models/pet/pet');
const uploadFile = require('../../routes/api/upload');



module.exports = {
    create,
    index,
    getById,
    update,
    deletePet,

};

async function create(req, res) {
    try {
        const photoUrl = await uploadFile(req, res);
        const { age, ...otherFields } = req.body;
        const parsedAge = JSON.parse(age);
        const newPet = new Pet({ age: parsedAge, ...otherFields, photoUrl });
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

async function getById(req, res) {
    try {
        const pet = await Pet.findById(req.params.id);
        res.status(200).json(pet);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function update(req, res) {
    try {
        const updatedPet = await Pet.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedPet);
    } catch (error) {
        console.log('fuuuuuuuuuuuuuuuuuuuuuuuuuuuuug')
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function deletePet(req, res) {
    try {
        const deletedPet = await Pet.findByIdAndRemove(req.params.id);
        res.status(200).json(deletedPet);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}