import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as dataAPI from "../../utilities/data-api";
import { Link } from 'react-router-dom';


export default function PetDetailPage({ user }) {
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

	console.log(pet)
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
										<h5>Organization Name</h5>
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
												<div>{pet.age.value} {pet.age.unit}</div>
											</li>
											<li>
												<span>LOCATION</span>
												<div>{pet.location.address}</div>
											</li>

										</ul>
									</div>
								</div>
								{/* Conditionally render the buttons */}
								{user && pet.organizationId === user.id ? (
									<div className="pet-crud-buttons">
										<Link className="btn btn-yellow" to={`/pets/${pet._id}/update`}>
											Edit Listing
										</Link>
										<Link className="btn btn-red-outline" to={`/pets/${pet._id}/delete`}>
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
					</>
				) : (
					<p>Loading...</p>
				)}
			</div>
		</>
	);
}
