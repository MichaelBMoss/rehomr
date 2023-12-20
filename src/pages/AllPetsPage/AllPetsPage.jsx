import { useState, useEffect } from "react";
import * as dataAPI from "../../utilities/data-api";
import PetCard from "../../components/PetCard/PetCard";
import { getDistance } from "geolib";

export default function AllPetsPage({ user }) {
	const [pets, setPets] = useState([]);
	const [sortOrder, setSortOrder] = useState("name");

	const handleSortChange = (e) => {
		setSortOrder(e.target.value);
	};

	const convertToWeeks = (age) => {
		switch (age.unit) {
			case "years":
				return age.value * 52;
			case "months":
				return age.value * 4;
			case "weeks":
			default:
				return age.value;
		}
	};

	useEffect(() => {
		const fetchAllPets = async () => {
			try {
				let data = await dataAPI.getAll("/api/pets");
				if (user) {
					data = data.map((pet) => {
						const distanceInMeters = getDistance(
							{ latitude: user.location.lat, longitude: user.location.lng },
							{ latitude: pet.location.lat, longitude: pet.location.lng }
						);
						const distanceInMiles = (distanceInMeters * 0.000621371).toFixed(2);
						return { ...pet, distance: distanceInMiles };
					});
				}
				if (sortOrder === "age") {
					data.sort((a, b) => convertToWeeks(a.age) - convertToWeeks(b.age));
				} else if (sortOrder === "distance") {
					data.sort((a, b) => a.distance - b.distance);
				} else {
					data.sort((a, b) => a[sortOrder].localeCompare(b[sortOrder]));
				}
				setPets(data);
			} catch (error) {
				console.error(error);
			}
		};
		fetchAllPets();
	}, [sortOrder]);

	return (
		<>
			<div className="index-wrap">
				<h1>All Pets Page</h1>
				<select value={sortOrder} onChange={handleSortChange}>
					<option value="name">Name</option>
					<option value="animal">Animal</option>
					<option value="age">Age</option>
					<option value="breed">Breed</option>
					<option value="gender">Gender</option>
					{user && <option value="distance">Distance</option>}
				</select>
				<div className="list-group">
					{pets.length > 0 &&
						pets.map((pet) => (
							<PetCard
								pet={pet}
								key={pet._id}
								distance={pet.distance}
								user={user}
							/>
						))}
				</div>
			</div>
		</>
	);
}
