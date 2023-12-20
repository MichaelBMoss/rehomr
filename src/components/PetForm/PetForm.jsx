import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {getUser} from '../../utilities/users-service'


export default function PetForm({ purpose, formData, setFormData, petId = null }) {
  const [file, setFile] = useState(null);
  const [zipCode, setZipCode] = useState("");
  const [orgId, setOrgId] = useState("")


  const handleZipCodeChange = async (event) => {
    const zipCode = event.target.value;
    setZipCode(zipCode); // Update the state here
  
    // If the zip code has 5 digits
    if (zipCode.length === 5) {
      try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`);
        console.log('Google Maps API response:', response.data); 
        if (response.data.results[0]) {
          const location = response.data.results[0].geometry.location;
          const address = response.data.results[0].formatted_address;
          console.log('address', address); 
          console.log('location', location); 
          setFormData({
            ...formData,
            location: {
              lat: location.lat,
              lng: location.lng,
              address: address
            },
          });
          console.log('location', formData.location);
        }
      } catch (error) {
        console.error('Error getting location:', error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'ageValue' || name === 'ageUnit') {
      setFormData({
        ...formData,
        age: {
          ...formData.age,
          [name === 'ageValue' ? 'value' : 'unit']: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = getUser();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'age') {
        data.append('age', JSON.stringify(formData.age));
      } else if (key === 'location') {
      data.append('location', JSON.stringify(formData.location));
    } else {
        data.append(key, formData[key]);
      }
    });
    data.append('file', file);
    data.append('organizationId', user._id)
    

    try {
      let response;
      if (purpose === 'create') {
        response = await axios.post('/api/pets', data);
      } else if (purpose === 'update') {
        response = await axios.put(`/api/pets/${petId}`, data);
      }

      if (response.status === 201 || response.status === 200) {
        const newPetId = response.data._id;
        console.log('Pet created:', response.data);
        navigate(`/pets/${newPetId}`);
      } else {
        console.error('Error creating pet:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating pet:', error);
    }
  };


  return (
    <div className="pet-form-container">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <label>Animal:</label>
        <select
          name="animal"
          value={formData.animal}
          onChange={handleChange}
        >
          <option value="" disabled>Select</option>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
          <option value="Other">Other</option>
        </select>
        <label>Breed:</label>
        <input
          type="text"
          name="breed"
          value={formData.breed}
          onChange={handleChange}
        />
        <label>Age:</label>
        <div className="pet-age-input-wrap">
          <input
            type="number"
            name="ageValue"
            value={formData.age.value}
            onChange={handleChange}
          />
          <select
            name="ageUnit"
            value={formData.age.unit}
            onChange={handleChange}
          >
            <option value="weeks">Weeks</option>
            <option value="months">Months</option>
            <option value="years">Years</option>
          </select>
        </div>
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        ></textarea>
        <label>Gender:</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="" disabled>Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <label>Zip Code:</label>
        <input
          type="text"
          name="zipCode"
          value={zipCode}
          onChange={handleZipCodeChange}
          minLength={5}
          maxLength={5}
        />

        <label>Photo:</label>
        <input type="file" onChange={handleFileChange} />

        <button className="btn btn-yellow" type="submit">Submit</button>
      </form>
    </div>
  );
}