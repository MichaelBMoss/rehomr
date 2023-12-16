import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function PetForm({ purpose, formData, setFormData, petId = null }) {
  const [file, setFile] = useState(null);

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
    if (formData.photoUrl) {
      formData.photoUrl = ''
    }
    setFile(e.target.files[0]);
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'age') {
        data.append('age', JSON.stringify(formData.age));
      } else {
        data.append(key, formData[key]);
      }
    });
    data.append('file', file);

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
        <input
          type="text"
          name="animal"
          value={formData.animal}
          onChange={handleChange}
        />
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
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />

        <label>Photo:</label>
        <input type="file" onChange={handleFileChange} />

        <button className="btn btn-yellow" type="submit">Submit</button>
      </form>
    </div>
  );
}