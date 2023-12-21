import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../utilities/users-service'


export default function PetForm({ purpose, formData, setFormData, petId = null }) {
  const [file, setFile] = useState(null);
  const token = localStorage.getItem('token');

  const handleChange = async (e) => {
    const { name, value } = e.target;
    if (name === 'ageValue' || name === 'ageUnit') {
      setFormData({
        ...formData,
        age: {
          ...formData.age,
          [name === 'ageValue' ? 'value' : 'unit']: value,
        },
      });
    } else  {
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
    const headers = {
      Authorization: `Bearer ${token}`
    };

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'age') {
        data.append('age', JSON.stringify(formData.age));
      }  else {
        data.append(key, formData[key]);
      }
    });
    data.append('file', file);
    data.append('organizationId', user._id)
    
    try {
      let response;
      if (purpose === 'create') {
        response = await axios.post('/api/pets', data, { headers });
      } else if (purpose === 'update') {
        response = await axios.put(`/api/pets/${petId}`, data, { headers });
      }

      if (response.status === 201 || response.status === 200) {
        const newPetId = response.data._id;
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
          value={formData.zipCode}
          onChange={handleChange}
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