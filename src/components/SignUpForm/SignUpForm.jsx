import { useState } from "react";
import axios from "axios";
import { signUp, getUser } from "../../utilities/users-service";
import { useNavigate } from "react-router-dom";

export default function SignUpForm({ setUser }) {
	const [credentials, setCredentials] = useState({
		name: "",
		email: "",
		role: "",
		location: "",
		password: "",
		confirm: "",
		photoUrl: "",
	});
	const [zipCode, setZipCode] = useState("");
	const [error, setError] = useState("");

	const handleZipCodeChange = async (event) => {
		const zipCode = event.target.value;
		setZipCode(zipCode);
		if (zipCode.length === 5) {
			try {
				const response = await axios.get(
					`https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
				);
				if (response.data.results[0]) {
					const location = response.data.results[0].geometry.location;
					const address = response.data.results[0].formatted_address;
					setCredentials({
						...credentials,
						location: {
							lat: location.lat,
							lng: location.lng,
							address: address,
						},
					});
				}
			} catch (error) {
				console.error("Error getting location:", error);
			}
		}
	};

	function handleChange(evt) {
		setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
		setError("");
	}

	const handleFileChange = (evt) => {
		setCredentials({ ...credentials, file: evt.target.files[0] });
	};

	const navigate = useNavigate();

	async function handleSubmit(evt) {
		evt.preventDefault();

		try {
			if (credentials.role === "petSeeker") {
				const user = await signUp(credentials);
				setUser(user);
				navigate("/");
			} else {
				const formData = new FormData();
				Object.keys(credentials).forEach((key) => {
					if (key === "location") {
						formData.append("location", JSON.stringify(credentials.location));
					} else {
						formData.append(key, credentials[key]);
					}
				});

				let response;
				response = await axios.post("api/users/org", formData);
				localStorage.setItem("token", response.data);
				setUser(getUser());
				navigate("/");
			}
		} catch (err) {
			setError("Sign Up Failed - Try Again");
		}
	}

	return (
		<>
			<div className="form-container">
				<h1>Sign Up</h1>
				<form autoComplete="off" onSubmit={handleSubmit}>
					<label>Name</label>
					<input
						type="text"
						name="name"
						value={credentials.name}
						onChange={handleChange}
						required
					/>
					<label>Email</label>
					<input
						type="text"
						name="email"
						value={credentials.email}
						onChange={handleChange}
						required
					/>
					<label>Password</label>
					<input
						type="password"
						name="password"
						value={credentials.password}
						onChange={handleChange}
						required
					/>
					<label>Confirm</label>
					<input
						type="password"
						name="confirm"
						value={credentials.confirm}
						onChange={handleChange}
						required
					/>
					{/* <label>Location</label>
					<input
						type="text"
						name="location"
						value={credentials.location}
						onChange={handleChange}
						required
					/> */}
					<label>Zip Code:</label>
					<input
						type="text"
						name="zipCode"
						value={zipCode}
						onChange={handleZipCodeChange}
						minLength={5}
						maxLength={5}
						required
					/>

					<label>Select the option that applies to you:</label>
					<div className="form-check">
						<input
							className="form-check-input"
							type="radio"
							id="petSeeker"
							name="role"
							value="petSeeker"
							checked={credentials.role === "petSeeker"}
							onChange={handleChange}
							required
						/>
						<label htmlFor="petSeeker">
							<span>Pet Seeker</span> – I want to find a pet to adopt
						</label>
						<br />
						<input
							className="form-check-input"
							type="radio"
							id="organization"
							name="role"
							value="organization"
							checked={credentials.role === "organization"}
							onChange={handleChange}
							required
						/>
						<label htmlFor="organization">
							<span>Organization</span> – I want to list pets for adoption
						</label>
					</div>
					<br />
					{credentials.role === "organization" && (
						<>
							<label>Organization Photo:</label>
							<input type="file" accept="image/*" onChange={handleFileChange} />
						</>
					)}
					<button className="btn btn-yellow" type="submit">
						SIGN UP
					</button>
				</form>
			</div>
			<p className="error-message">{error}</p>
		</>
	);
}
