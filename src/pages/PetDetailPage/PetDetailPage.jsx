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
          <p>Name: {pet.name}</p>
          <p>Animal Type: {pet.animal}</p>
            <p>Breed: {pet.breed}</p>
            <p>Age: {pet.age}</p>
            <p>Gender: {pet.gender}</p>
            <p>Bio: {pet.description}</p>
            {/* <button onClick={handleDeletePet}>Delete Pet</button> */}

          </>

            : <p>Loading...</p>}
        </div>
    </>
  );
}