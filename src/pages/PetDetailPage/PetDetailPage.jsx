import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as petsAPI from "../../utilities/pets-api";
import { Link } from 'react-router-dom';


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
						<span>
							<Link to={`/pets/${pet._id}/update`}>
								<button>Edit Listing</button>
							</Link>
							<Link to={`/pets/${pet._id}/delete`}>
								<button>Remove Listing</button>
							</Link>
            			</span>
					</>
				) : (
					<p>Loading...</p>
				)}
			</div>
		</>
	);
}
