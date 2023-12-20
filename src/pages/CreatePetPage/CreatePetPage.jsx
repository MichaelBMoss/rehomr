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
		if (!user) {
			console.log('Redirecting to login, user is not authenticated.');
			// If the user is not authorized, navigate them to the "/login" page
			navigate("/login");
		}
	}, [user, navigate]); // Dependencies array includes `user` and `navigate`

	if (!user) {
		// While waiting for the effect to run, you can return null or a loading indicator
		return null;
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
