import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as dataAPI from "../../utilities/data-api";
import { useNavigate } from 'react-router-dom';
import axios from "axios";


export default function DeletePetPage() {
	const [pet, setPet] = useState();
	const { petId } = useParams();
	const navigate = useNavigate();

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

	const handleRemovePet = async () => {
		try {
			// Make an API request to delete the pet by ID
			const response = await axios.delete(`/api/pets/${petId}`);

			// Redirect to a different page after successful deletion
			navigate("/pets");

			console.log("Pet deleted:", response.data);
		} catch (error) {
			console.error(error);
			// Handle error
		}
	};

	return (
		<>
			<div className="pet-form">
				<h1>Delete Pet Page</h1>
				{pet ? (
					<>
						<p>Are you sure you want to remove {pet.name}?</p>
						<div className="pet-crud-buttons">
							<button className="btn btn-red" onClick={handleRemovePet}>Remove</button>
							<button className="btn btn-yellow-outline" onClick={() => window.history.back()}>Cancel</button>
						</div>
					</>
				) : (
					<p>Loading...</p>
				)}
			</div>
		</>
	);
}
