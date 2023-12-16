import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import * as petsAPI from "../../utilities/pets-api";
import { useNavigate } from 'react-router-dom';
import axios from "axios";


export default function PetDetailPage() {
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
			<div>
				<h1>Delete Pet Page</h1>
				{pet ? (
					<>
						<div>
							<p>Are you sure you want to remove {pet.name}?</p>
              <button onClick={handleRemovePet}>Remove</button>
              <button onClick={() => window.history.back()}>Cancel</button>
						</div>
					</>
				) : (
					<p>Loading...</p>
				)}
			</div>
		</>
	);
}
