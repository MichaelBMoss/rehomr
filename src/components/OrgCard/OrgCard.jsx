import { Link } from "react-router-dom";

export default function OrgCard({ org }) {
    return (
        <>
              <Link className="card org-card" to={`/orgs/${org._id}`} key={org._id}>
                <div className="org-card-photo">
                  <img src={`${org.photoUrl}`} alt={`${org.name}`} />
                </div>
                <div className="org-card-info">
                  <h3>{org.name}</h3>
                  <span>{org.location?.address}</span>
                </div>
              </Link>  
        </>
    )
}
