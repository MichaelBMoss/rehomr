import { Link } from "react-router-dom";

export default function PetCard({ pet }) {
    return (
        <>
            <Link to={`/pets/${pet._id}`}>
                <div>
                    <h3>{pet.name}</h3>
                    <p>{pet.age.value} {pet.age.unit}</p>
                    <p>{pet.location}</p>
                </div>
            </Link>
        </>
    )
}
