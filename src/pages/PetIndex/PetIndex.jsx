import { useState } from "react";
import * as petsAPI from "../../utilities/pets-api";
import { useHistory } from "react-router-dom";
import "./PetIndex.css";

import { useEffect, useState } from "react";
import * as petsAPI from "../../utilities/pets-api";

export default function PetIndex() {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const data = await petsAPI.getAllPets();
                setPets(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPets();
    }, []);

    return (
        <div>
            <h1>All Pets</h1>
            <ul>
                {pets.map((pet) => (
                    <li key={pet._id}>{pet.name}</li>
                ))}
            </ul>
        </div>
    );
}
