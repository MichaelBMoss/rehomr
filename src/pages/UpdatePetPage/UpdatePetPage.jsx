import PetForm from '../../components/PetForm/PetForm';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as petsAPI from "../../utilities/pets-api";
import { useNavigate } from 'react-router-dom';

export default function UpdatePetPage() {
    const [pet, setPet] = useState();
    const { petId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPet = async () => {
            try {
                const data = await petsAPI.getById(petId);
                setPet(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchPet();
    }, [petId]);

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
        location: '',
    });

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
                location: pet.location || '',
            });
        }
    }, [pet]);

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
