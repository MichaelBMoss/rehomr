import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
			const response = await axios.post("/api/pets", data);

			if (response.status === 201) {
				console.log("Pet created:", response.data);
				setFormData({
					name: "",
					animal: "",
					breed: "",
					age: { value: "", unit: "years" },
					description: "",
					gender: "",
					location: "",
				});
				setFile(null);
				navigate("/pets");
			} else {
				console.error("Error creating pet - else:", response.statusText);
			}
		} catch (error) {
			console.error("Error creating pet - catch:", error);
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
					<input type="file" name="file" onChange={handleFileChange} />
				</div>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}
