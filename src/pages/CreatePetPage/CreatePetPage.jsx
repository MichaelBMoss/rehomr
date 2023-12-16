import PetForm from '../../components/PetForm/PetForm';
import { useState} from "react";


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

  return (
    <div>
      <h1>Add a pet for adoption</h1>
      <PetForm 
        purpose={'create'} 
        formData={formData}
        setFormData={setFormData}
        />
    </div>
  );
}
