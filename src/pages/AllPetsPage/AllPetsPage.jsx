import { useState, useEffect } from "react";
import * as petsAPI from "../../utilities/pets-api";
import PetCard from "../../components/PetCard/PetCard";

export default function AllPetsPage() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchAllPets = async () => {
      try {
        const data = await petsAPI.getAll();
        setPets(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllPets();
  }, []); // The empty dependency array ensures this effect runs only once on mount

  return (
    <>
      <h1>All Pets Page</h1>
      <div className="card-group">
        {pets.map((pet) => (
          <PetCard pet={pet} key={pet._id} />
        ))}
      </div>
    </>
  );
}
