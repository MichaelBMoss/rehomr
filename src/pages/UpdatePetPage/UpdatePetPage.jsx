import PetForm from '../../components/PetForm/PetForm';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as dataAPI from "../../utilities/data-api";
import { useNavigate } from 'react-router-dom';

export default function UpdatePetPage({ user }) {
    const navigate = useNavigate();
    const [pet, setPet] = useState();
    const { petId } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        animal: '',
        breed: '',
        age: {
            value: '',
            unit: 'years',
        },
        description: '',
        gender: '',
        zipCode: '',
        photoUrl: '',
    });

    useEffect(() => {
        const fetchPet = async () => {
            try {
                const data = await dataAPI.getById('/api/pets', petId);
                setPet(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchPet();
    }, [petId]);

    // Initialize formData with pet data when available
    useEffect(() => {
        if (pet) {
            setFormData({
                name: pet.name || '',
                animal: pet.animal || '',
                breed: pet.breed || '',
                age: {
                    value: pet.age?.value || '',
                    unit: pet.age?.unit || 'years',
                },
                description: pet.description || '',
                gender: pet.gender || '',
                zipCode: pet.zipCode || '',
                photoUrl: pet.photoUrl || ''
            });
        }
    }, [pet]);

    	// Check if the user's ID matches the pet's organizationId
	const isUserAuthorized = user && pet && user._id === pet.organizationId;

	if (!isUserAuthorized) {
		// If the user is not authorized, navigate them to the "/login" page
		navigate("/");
		return null; // You may return null or display an appropriate message
	}


    return (
        <div className="pet-form">
            <h1>Edit Pet's information:</h1>
            <PetForm
                purpose={'update'}
                formData={formData}
                setFormData={setFormData}
                petId={petId}
            />
        </div>
    );
}
