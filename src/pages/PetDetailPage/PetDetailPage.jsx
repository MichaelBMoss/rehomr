import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as dataAPI from "../../utilities/data-api";
import { Link } from 'react-router-dom';


export default function PetDetailPage() {
	const [pet, setPet] = useState();
	const { petId } = useParams();

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

	return (
		<>
			<div>
				<h1>Pet Details</h1>
				{pet ? (
					<>
						<div>
						<img src={pet.photoUrl} alt={pet.name} />
							<p>Name: {pet.name}</p>
							<p>Animal Type: {pet.animal}</p>
							<p>Breed: {pet.breed}</p>
							<p>Age: {pet.age.value} {pet.age.unit}</p>
							<p>Gender: {pet.gender}</p>
							<p>Bio: {pet.description}</p>
							<p>Location: {pet.location.address}</p>
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
