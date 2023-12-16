import { useState } from "react";
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
		photoUrl: "",
	});

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
