import { Link } from "react-router-dom";

export default function PetCard({ pet, distance, user }) {
    return (
        <>
            <Link className="card pet-card" to={`/pets/${pet._id}`}>
                <div className="pet-card-photo">
                    <img src={`${pet.photoUrl}`} alt="" />
                </div>
                <div className="pet-card-info">
                    <h3>{pet.name}</h3>
                    <p>{pet.breed} | {pet.gender} | {pet.age.value} {pet.age.unit}</p>
                    <span>{user && distance ? `Your new best friend is ${distance} miles away` : pet.location.address}</span>
                </div>
            </Link>
        </>
    )
}
