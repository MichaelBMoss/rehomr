import { useState, useEffect } from "react";
import PetForm from "../../components/PetForm/PetForm";
import { useNavigate } from 'react-router-dom';

export default function CreatePetPage({ user }) {

	const navigate = useNavigate();

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
		zipCode: "",
		photoUrl: "",
	});

	useEffect(() => {
		if (user && user.role !== 'organization') {
			navigate("/login");
		}
	}, [user, navigate]);
	
	if (!user || user.role !== 'organization') {
		return <div>Loading...</div>;
	}

	return (
		<div className="pet-form">
			<h1>Add a pet for adoption</h1>
			<PetForm
				purpose={"create"}
				formData={formData}
				setFormData={setFormData}
			/>
		</div>
	);
}
