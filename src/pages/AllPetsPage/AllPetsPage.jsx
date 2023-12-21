import { useState, useEffect } from "react";
import * as dataAPI from "../../utilities/data-api";
import PetCard from "../../components/PetCard/PetCard";
import { getDistance } from "geolib";
import { GoogleMap, MarkerF } from "@react-google-maps/api";

export default function AllPetsPage({ user }) {
	const [pets, setPets] = useState([]);
	const [sortOrder, setSortOrder] = useState("name");
	const [avgLat, setAvgLat] = useState(0);
	const [avgLng, setAvgLng] = useState(0);

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

				// Calculate the average latitude and longitude
				let avgLat = 0;
				let avgLng = 0;
				let count = 0;

				data.forEach((pet) => {
					if (pet.location && pet.location.lat && pet.location.lng) {
						avgLat += pet.location.lat;
						avgLng += pet.location.lng;
						count++;
					}
				});

				avgLat /= count;
				avgLng /= count;

				// Set the average latitude and longitude in the state
				setAvgLat(avgLat);
				setAvgLng(avgLng);
			} catch (error) {
				console.error(error);
			}
		};
		fetchAllPets();
	}, [sortOrder, user]);

	return (
		<>
			<div className="index-wrap">
				{/* <h1>All Pets</h1> */}
				{pets.length > 0 ? (
					<div className="pets-list-map-wrap" >
						<h5>Where in the world is your new friend waiting for you:</h5>
						<div className="map-card">
							<GoogleMap
								mapContainerStyle={{ width: "700px", height: "300px" }}
								center={{ lat: avgLat, lng: avgLng }} // Center the map on the average location
								zoom={4}
							>
								{pets.map(
									(pet, index) =>
										pet.location &&
										pet.location.lat &&
										pet.location.lng && (
											<MarkerF
												key={index}
												position={{
													lat: pet.location.lat,
													lng: pet.location.lng,
												}}
											/>
										)
								)}
							</GoogleMap>
						</div>
					</div>
				) : (
					<p>Loading map...</p>
				)}
				<h1>All Pets</h1>
				<div className="sort-wrap">
					<label htmlFor="sort-select">Sort By:</label>
					<select id="sort-select" value={sortOrder} onChange={handleSortChange}>
						<option value="name">Name</option>
						<option value="animal">Animal</option>
						<option value="age">Age</option>
						<option value="breed">Breed</option>
						<option value="gender">Gender</option>
						{user && <option value="distance">Distance</option>}
					</select>
				</div>
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
