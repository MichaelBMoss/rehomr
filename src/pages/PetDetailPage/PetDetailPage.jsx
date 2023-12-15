import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as petsAPI from "../../utilities/pets-api";

export default function PetDetailPage() {
	const [pet, setPet] = useState();
	const { id } = useParams();

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const data = await petsAPI.getById(id);
        setPet(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPet();
  }, [id]);
	return (
		<>
			<div>
				<h1>Pet Details</h1>
				{pet ? (
					<>
						<div>
							<p>Name: {pet.name}</p>
							<p>Animal Type: {pet.animal}</p>
							<p>Breed: {pet.breed}</p>
							<p>Age: {pet.age}</p>
							<p>Gender: {pet.gender}</p>
							<p>Bio: {pet.description}</p>
						</div>
						{/* <button onClick={handleDeletePet}>Delete Pet</button> */}
					</>
				) : (
					<p>Loading...</p>
				)}
			</div>
		</>
	);
}
