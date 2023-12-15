import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as petsAPI from "../../utilities/pets-api";

export default function PetDetailPage() {
  const [pet, setPet] = useState();
  const { id } = useParams();

  const fetchPet = async () => {
    try {
      const data = await petsAPI.getById(id); // Changed from getOnePet to getById
      setPet(data);
    } catch (error) {
      console.error(error);
    }
  }; fetchPet();



  return (
    <>
      <div>
        <h1>Pet Details</h1>
        {pet ?
          <>
          <p>{pet.name}</p>
          <p>{pet.animal}</p>
          <p>{pet.breed}</p>
          </>

            : <p>Loading...</p>}
        </div>
    </>
  );
}