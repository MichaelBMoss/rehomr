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
			<div>
				<h1>Org Details</h1>
				{org ? (
					<>
						<div>
						    <p>Name: {org.name}</p>
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
