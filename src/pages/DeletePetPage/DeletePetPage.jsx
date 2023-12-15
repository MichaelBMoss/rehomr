import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as petsAPI from "../../utilities/pets-api";

export default function DeletePetPage() {
  const { petId } = useParams();
  const [pet, setPet] = useState(null);
  const [confirmation, setConfirmation] = useState(false);

  useEffect(() => {
    // Fetch pet data when the component mounts
    const fetchPetData = async () => {
      try {
        const petData = await petsAPI.getById(petId);
        setPet(petData);
      } catch (error) {
        console.error(error);
        // Handle any errors here
      }
    };

    fetchPetData(); // Call the fetch function
  }, [petId]); // Run this effect whenever the petId changes

  const handleDeleteClick = () => {
    // Set confirmation to true when the user clicks "Yes, Delete"
    setConfirmation(true);
  };

  const handleCancelClick = () => {
    // Handle the cancel action (e.g., navigate back) when the user clicks "No, Don't Delete"
    // You can add your cancellation logic here
  };

  return (
    <>
      <h1>Delete Pet Page</h1>
      {pet ? (
        <>
          {confirmation ? (
            <>
              <p>Are you sure you want to delete {pet.name}?</p>
              <button onClick={handleDeleteClick}>Yes, Delete</button>
              <button onClick={handleCancelClick}>No, Don't Delete</button>
            </>
          ) : (
            <button onClick={handleDeleteClick}>Delete Pet</button>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
