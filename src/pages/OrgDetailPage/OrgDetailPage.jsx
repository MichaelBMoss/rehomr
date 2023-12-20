import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as userAPI from "../../utilities/users-api";
import PetCard from "../../components/PetCard/PetCard";
import * as dataAPI from "../../utilities/data-api";
// import { Link } from 'react-router-dom';


export default function OrgDetailPage() {
	const [org, setOrg] = useState();
	const { orgId } = useParams();
	const [pets, setPets] = useState([]);

	useEffect(() => {
		const fetchOrg = async () => {
			try {
				const data = await userAPI.getById('/api/users/orgs', orgId);
				setOrg(data);
			} catch (error) {
				console.error(error);
			}
		};
		fetchOrg();

		async function fetchOrgsPets() {
			try {
				const orgsPets = await dataAPI.getOrgsPets('/api/pets/orgspets', orgId)
				setPets(orgsPets)
			} catch (err) {
				console.error(err);
			}
		}
		fetchOrgsPets();
	}, [orgId]);

	return (
		<>
			<div className="org-detail-wrap">
				{org ? (
					<>
						<div className="org-detail-page">

							<div className="org-detail-card">
								<div className="org-detail-image">
									<img src={org.photoUrl} alt={org.name} />
								</div>
								<div className="org-detail-info">
									<h1>{org.name}</h1>
									<div>{org.location.address}</div>
								</div>
							</div>
							<div className="org-detail-pets-wrap">
								{pets.length ? (
									<>
										<h2>Pet's Available at {org.name}</h2>
										<div className="orgs-pets-list">
											{pets.map((pet) => (
												<PetCard pet={pet} key={pet._id} />
											))}
										</div>
									</>
								) : (
									<p>No pets available</p>
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
