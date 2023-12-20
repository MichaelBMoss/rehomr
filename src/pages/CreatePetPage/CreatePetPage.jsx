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
		location: "",
		photoUrl: "",
	});

	useEffect(() => {
		if (user && user.role !== 'organization') {
			console.log('Redirecting to login, user is not authorized.');
			navigate("/login");
		}
	}, [user, navigate]);
	
	if (!user || user.role !== 'organization') {
		// Show a loading indicator or return null while waiting for the effect to run
		return <div>Loading...</div>; // or return null;
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
