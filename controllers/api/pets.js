const Pet = require('../../models/pet/pet');
const { uploadFile, uploadFileUpdate } = require('../../src/utilities/image-api');




module.exports = {
    create,
    index,
    getById,
    update,
    deletePet,
    getOrgsPets,
};

async function create(req, res) {
    try {
        const photoUrl = await uploadFile(req, res);
        const { age, location, ...otherFields } = req.body;
        const parsedAge = JSON.parse(age);
        const parsedLocation = JSON.parse(location);
        const newPet = new Pet({ age: parsedAge, location: parsedLocation, ...otherFields, photoUrl });
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
        let photoUrl;

        try {
            const uploadResult = await uploadFileUpdate(req, res);
            if (uploadResult && uploadResult.fileUploaded) {
                photoUrl = uploadResult.location;
            }
        } catch (uploadError) {
            // If an actual error occurred during the file upload, return an error response
            return res.status(500).json({ error: 'Error uploading file', details: uploadError.message });
        }

        const { age, location, ...otherFields } = req.body;

        // Ensure that age and location are parsed correctly
        let parsedAge, parsedLocation;
        try {
            parsedAge = JSON.parse(age);
            parsedLocation = JSON.parse(location);
        } catch (parseError) {
            return res.status(400).json({ error: 'Invalid age or location format' });
        }

        // Construct the update object
        const updateData = { 
            ...otherFields, 
            ...(photoUrl ? { photoUrl } : {}),
            age: parsedAge,
            location: parsedLocation
        };

        // Update the pet information in the database
        const updatedPet = await Pet.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!updatedPet) {
            return res.status(404).json({ error: 'Pet not found' });
        }

        res.status(200).json(updatedPet);
    } catch (error) {
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

async function getOrgsPets(req, res) {
    try {
        const orgsPets = await Pet.find({ organizationId: req.params.id })
        res.json(orgsPets)
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' })

    }
}