const Pet = require('../../models/pet/pet');
const { uploadFile, uploadFileUpdate } = require('../../src/utilities/image-api');
const axios = require('axios');
require('dotenv').config();



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
        const { age, zipCode, ...otherFields } = req.body;
        const locationData = await getLocationData(zipCode); // Await the async function
        const parsedAge = JSON.parse(age);
        const newPet = new Pet({ 
            age: parsedAge, 
            ...otherFields, 
            photoUrl, 
            location: locationData,
            zipCode: zipCode,
        });
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
        // Fetch the pet first to check ownership
        const pet = await Pet.findById(req.params.id);
        if (!pet) {
            return res.status(404).json({ error: 'Pet not found' });
        }

        // Check if the logged-in user's ID matches the pet's organizationId
        if (pet.organizationId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'User not authorized to update this pet' });
        }

        // Handle file upload logic
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

        const { age, zipCode, ...otherFields } = req.body;
        const locationData = await getLocationData(zipCode);
        // Ensure that age and location are parsed correctly
        let parsedAge;
        try {
            parsedAge = JSON.parse(age);
        } catch (parseError) {
            return res.status(400).json({ error: 'Invalid age or location format' });
        }

        // Construct the update object
        const updateData = { 
            ...otherFields, 
            ...(photoUrl ? { photoUrl } : {}),
            age: parsedAge,
            location: locationData,
            zipCode: zipCode,
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
        // Find the pet by ID without removing it first
        const pet = await Pet.findById(req.params.id);

        // Check if pet exists
        if (!pet) {
            return res.status(404).json({ error: 'Pet not found' });
        }

        // Check if the logged-in user's ID matches the pet's organizationId
        if (pet.organizationId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'User not authorized to delete this pet' });
        }

        // If the user is authorized, delete the pet
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

const getLocationData = async (zipCode) => {
    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY; // Ensure this is set in your environment variables
    try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&key=${apiKey}`);
        if (response.data.results.length) {
            const location = response.data.results[0].geometry.location;
            const address = response.data.results[0].formatted_address;
            return { 
                lat: location.lat, 
                lng: location.lng, 
                address: address 
            };
        } else {
            throw new Error('Location not found');
        }
    } catch (error) {
        console.error('Error fetching location data:', error);
        throw error; // Rethrow the error to handle it in the calling function
    }
};
