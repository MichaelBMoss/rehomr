import { useState } from "react";

export default function CreatePetPage() {
	const [formData, setFormData] = useState({
		name: "",
		animal: "",
		breed: "",
		age: {
			value: "",
			unit: "years", // Default value
		},
		description: "",
		gender: "",
		location: "",
	});

	const [file, setFile] = useState(null);

	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name === "ageValue" || name === "ageUnit") {
			setFormData({
				...formData,
				age: {
					...formData.age,
					[name === "ageValue" ? "value" : "unit"]: value,
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
  }

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const xhr = new XMLHttpRequest();
			xhr.open("POST", "/api/pets", true);
			xhr.setRequestHeader("Content-Type", "application/json");

			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4) {
					if (xhr.status === 201) {
						console.log("Pet created:", JSON.parse(xhr.responseText));
						setFormData({
							name: "",
							animal: "",
							breed: "",
							age: { value: "", unit: "years" },
							description: "",
							gender: "",
							location: "",
						});
					} else {
						console.error("Error creating pet:", xhr.statusText);
					}
				}
			};

			const data = JSON.stringify(formData);
			xhr.send(data);
		} catch (error) {
			console.error("Error creating pet:", error);
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
					<select name="gender" value={formData.gender} onChange={handleChange}>
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
        <div>
          <label>Photo:</label>
          <input type="file" name="photo" onChange={handleFileChange} />
        </div>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
  }