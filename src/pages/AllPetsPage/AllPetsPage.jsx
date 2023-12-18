import { useState, useEffect } from "react";
import * as dataAPI from "../../utilities/data-api";
import PetCard from "../../components/PetCard/PetCard";

export default function AllPetsPage() {
  const [pets, setPets] = useState([]);
  const [sortOrder, setSortOrder] = useState('name');

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  useEffect(() => {
    const fetchAllPets = async () => {
      try {
        const data = await dataAPI.getAll('/api/pets');
        data.sort((a, b) => a[sortOrder].localeCompare(b[sortOrder]));
        setPets(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllPets();
  }, [sortOrder]); // The empty dependency array ensures this effect runs only once on mount

  return (
    <>
      <div className="index-wrap">
        <h1>All Pets Page</h1>
        <select value={sortOrder} onChange={handleSortChange}>
          <option value="name">Name</option>
          <option value="animal">Animal</option>
          <option value="age">Age</option>
          <option value="breed">Breed</option>
          <option value="gender">Gender</option>
          <option value="location">Location</option>

        </select>
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
