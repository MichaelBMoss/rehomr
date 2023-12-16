import { Link } from "react-router-dom";

export default function PetCard({ pet }) {
    console.log(pet)
    return (
        <>
            <Link className="card pet-card" to={`/pets/${pet._id}`}>
                <div className="pet-card-photo">
                    <img src="images/enis-yavuz-KKtuRtGkDys-unsplash.jpg" alt="" />
                </div>
                <div className="pet-card-info">
                    <h3>{pet.name}</h3>
                    <p>{pet.breed} | {pet.gender} | {pet.age.value} {pet.age.unit}</p>
                    <p>Org Name</p>
                    <span>{pet.location}</span>
                </div>
            </Link>
        </>
    )
}
