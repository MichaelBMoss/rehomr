import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PetForm from "../../components/PetForm/PetForm";

export default function CreatePetPage() {
	const [formData, setFormData] = useState({
		name: "",
		animal: "",
		breed: "",
		age: {
			value: "",
			unit: "years", // Default value
		},
		description: "",
		gender: "",
		location: "",
	});

  return (
    <div className="pet-form">
      <h1>Add a pet for adoption</h1>
      <PetForm 
        purpose={'create'} 
        formData={formData}
        setFormData={setFormData}
        />
    </div>
  );
}
