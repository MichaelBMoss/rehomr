import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PetForm from '../../components/PetForm/PetForm';

export default function CreatePetPage() {
  const [formData, setFormData] = useState({
    name: '',
    animal: '',
    breed: '',
    age: {
      value: '',
      unit: 'years', // Default value
    },
    description: '',
    gender: '',
    location: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'ageValue' || name === 'ageUnit') {
      setFormData({
        ...formData,
        age: {
          ...formData.age,
          [name === 'ageValue' ? 'value' : 'unit']: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('/api/pets', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 201) {
        const newPetId = response.data._id;
        console.log('Pet created:', response.data);
        setFormData({
          name: '',
          animal: '',
          breed: '',
          age: { value: '', unit: 'years' },
          description: '',
          gender: '',
          location: '',
        });
        navigate(`/pets/${newPetId}`); // Navigate to the new pet's page
      } else {
        console.error('Error creating pet:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating pet:', error);
    }
  };
  

  return (
    <div>
      <h1>Add a pet for adoption</h1>
      <PetForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
