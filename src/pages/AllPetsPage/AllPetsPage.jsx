import { useState, useEffect } from "react";
import * as dataAPI from "../../utilities/data-api";
import PetCard from "../../components/PetCard/PetCard";

export default function AllPetsPage() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchAllPets = async () => {
      try {
        const data = await dataAPI.getAll('/api/pets');
        setPets(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllPets();
  }, []); // The empty dependency array ensures this effect runs only once on mount

  return (
    <>
      <div className="index-wrap">
        <h1>All Pets Page</h1>
        <div className="list-group">
          {pets.length > 0 &&
            pets.map((pet) => (
              <PetCard pet={pet} key={pet._id} />
            ))}
        </div>
      </div>
    </>
  );
}
