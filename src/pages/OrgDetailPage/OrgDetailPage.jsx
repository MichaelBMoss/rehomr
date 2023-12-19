import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as userAPI from "../../utilities/users-api";
// import { Link } from 'react-router-dom';


export default function OrgDetailPage() {
	const [org, setOrg] = useState();
	const { orgId } = useParams();

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
	}, [orgId]);

	return (
		<>
			<div className="org-detail-wrap">
				{org ? (
					<>
					<div className="org-detail-card">
						<div className="org-detail-image">
							<img src={org.photoUrl} alt={org.name} />
						</div>
						<div className="org-detail-info">
							<h1>{org.name}</h1>
							<div>{org.location.address}</div>
						</div>

					</div>
						<span>
							{/* <Link to={`/pets/${pet._id}/update`}>
								<button>Edit Listing</button>
							</Link>
							<Link to={`/pets/${pet._id}/delete`}>
								<button>Remove Listing</button>
							</Link> */}
						</span>
					</>
				) : (
					<p>Loading...</p>
				)}
			</div>
		</>
	);
}
