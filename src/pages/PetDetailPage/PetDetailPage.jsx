import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as dataAPI from "../../utilities/data-api";
import { Link } from "react-router-dom";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import * as userAPI from "../../utilities/users-api";

export default function PetDetailPage({ user }) {
	const [pet, setPet] = useState({
		name: "",
		animal: "",
		breed: "",
		age: {
			value: "",
			unit: "years",
		},
		description: "",
		gender: "",
		location: "",
		photoUrl: "",
		organizationId: "",
	});
	const { petId } = useParams();
	const [org, setOrg] = useState();

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Fetch pet data
				const petData = await dataAPI.getById("/api/pets", petId);
				setPet(petData);

				// Fetch organization data if pet and organizationId are available
				if (petData && petData.organizationId) {
					const orgId = petData.organizationId;
					const orgData = await userAPI.getById("/api/users/orgs", orgId);
					setOrg(orgData);
				}
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, [petId]);

	return (
		<>
			<div className="pet-detail-wrap">
				{pet ? (
					<>
						<div className="pet-detail-card">
							<div className="detail-card-image">
								<img src={pet.photoUrl} alt={pet.name} />
							</div>
							<div className="detail-card-info">
								<div className="detail-card-info-text">
									<div className="info-text-1">
										<h1>{pet.name}</h1>
										<h5>{pet.breed}</h5>
										{org ? <Link className="org-link" to={`/orgs/${org._id}`}>{org.name}</Link> : ''}
										<p>{pet.description}</p>
									</div>
									<div className="info-text-2">
										<div className="info-line"></div>
										<ul>
											<li>
												<span>ANIMAL</span>
												<div>{pet.animal}</div>
											</li>
											<li>
												<span>GENDER</span>
												<div>{pet.gender}</div>
											</li>
											<li>
												<span>AGE</span>
												<div>
													{pet.age.value} {pet.age.unit}
												</div>
											</li>
											<li>
												<span>LOCATION</span>
												<div>{pet.location.address}</div>
											</li>
										</ul>
									</div>
								</div>
								{user && pet.organizationId === user._id ? (
									<div className="pet-crud-buttons">
										<Link
											className="btn btn-yellow"
											to={`/pets/${pet._id}/update`}
										>
											Edit Listing
										</Link>
										<Link
											className="btn btn-red-outline"
											to={`/pets/${pet._id}/delete`}
										>
											Remove Listing
										</Link>
									</div>
								) : (
									<Link className="btn btn-yellow" to={`/`}>
										Message Organization
									</Link>
								)}

							</div>
						</div>
						<div className="map-wrap">
							<h2>Where is your new friend?</h2>
							<div className="map-card">
								{pet.location && pet.location.lat && pet.location.lng ? (
									<GoogleMap
										mapContainerStyle={{ width: "300px", height: "300px" }}
										center={{ lat: pet.location.lat, lng: pet.location.lng }}
										zoom={10}
									>
										<MarkerF
											key="0"
											// icon={{
											// 	url: "/images/paw.png",
											// 	scaledSize: new window.google.maps.Size(36, 36),
											// }}
											position={{
												lat: pet.location.lat,
												lng: pet.location.lng,
											}}
										/>
									</GoogleMap>
								) : (
									<p>Loading map...</p>
								)}
							</div>
						</div>
					</>
				) : (
					<p>Loading...</p>
				)}
			</div>
		</>
	);
}
