import { useState } from 'react';

export default function CreatePetPage() {
  const [formData, setFormData] = useState({
    name: '',
    animal: '',
    breed: '',
    age: '',
    description: '',
    gender: '',
    location: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    try {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/api/pets', true);
      xhr.setRequestHeader('Content-Type', 'application/json');
  
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 201) {
            // Handle successful response, e.g., redirect or display a success message
            console.log('Pet created:', JSON.parse(xhr.responseText));
  
            // Clear the form after submission
            setFormData({
              name: '',
              animal: '',
              breed: '',
              age: '',
              description: '',
              gender: '',
              location: '',
            });
          } else {
            console.error('Error creating pet:', xhr.statusText);
          }
        }
      };
  
      const data = JSON.stringify(formData);
      xhr.send(data);
    } catch (error) {
      console.error('Error creating pet:', error);
    }
  };
  

  return (
    <div>
      <h1>Add a pet for adoption</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Animal:</label>
          <input
            type="text"
            name="animal"
            value={formData.animal}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Breed:</label>
          <input
            type="text"
            name="breed"
            value={formData.breed}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
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
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
