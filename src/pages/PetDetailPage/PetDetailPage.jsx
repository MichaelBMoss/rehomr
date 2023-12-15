import { useState, useEffect } from "react";

export default function PetDetailPage({ user }) {
  const [petInfo, setpetInfo] = useState(null);
  const [pet, setPet] = useState(null);

  useEffect(() => { 
    async function getPetInfo() {
      const res = await fetch("/api/pets");
      const data = await res.json();
      setpetInfo(data);
    }
    getPetInfo();
  }
    , []);
  
  useEffect(() => {
    if (petInfo) {
      const pet = petInfo.find(p => p._id === id);
      setPet(pet);
    }
  }
    , [petInfo, id]);
  
  if (!pet) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <h1>{pet.name}</h1>
        <p>{pet.description}</p>
        // Add more pet details here
      </div>
    );
  }
}