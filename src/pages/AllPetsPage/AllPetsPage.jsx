import { useState, useEffect } from "react";
import * as petsAPI from "../../utilities/pets-api";
import { Link } from "react-router-dom";

export default function AllPetsPage() {
	const [pets, setPets] = useState([]);

	useEffect(() => {
		const fetchAllPets = async () => {
			try {
				const data = await petsAPI.getAll();
				setPets(data);
			} catch (error) {
				console.error(error);
			}
		};
		fetchAllPets();
	}, []); // The empty dependency array ensures this effect runs only once on mount

	return (
		<>
			<h1>All Pets Page</h1>
			{pets.map((pet) => (
				<Link to={`/pets/${pet._id}`} key={pet._id}>
					<div>
						<img src={pet.photoUrl} alt={pet.name} />
						<h3>{pet.name}</h3>
						<p>
							{pet.age.value} {pet.age.unit}
						</p>
						<p>{pet.location}</p>
					</div>
				</Link>
			))}
		</>
	);
}
