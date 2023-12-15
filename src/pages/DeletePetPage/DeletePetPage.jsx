import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as petsAPI from "../../utilities/pets-api";


export default function PetDetailPage() {
	const [pet, setPet] = useState();
	const { petId } = useParams();

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
    } catch (error) {
      console.error(error);
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
