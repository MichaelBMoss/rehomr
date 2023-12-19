import { useState } from "react";
import axios from 'axios';
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
	});
	const [error, setError] = useState("");

	function handleChange(evt) {
		setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
		setError("");
	}

	const handleFileChange = (evt) => {
		setCredentials({ ...credentials, file: evt.target.files[0] })
	}

	const navigate = useNavigate();

	async function handleSubmit(evt) {
		evt.preventDefault();

		if (credentials.role === 'petSeeker') {
			try {
				const user = await signUp(credentials);
				setUser(user);
				navigate("/");
			} catch {
				setError("Sign Up Failed - Try Again");
			}
		} else {
			const formData = new FormData()
			Object.keys(credentials).forEach((key) => {
				formData.append(key, credentials[key])
			})

			try {
				// const user = await signUp(credentials);
				let response;
				response = await axios.post('/api/users', formData)
				localStorage.setItem('token', response.data);
				setUser(getUser());
				navigate("/");
			} catch {
				setError("Sign Up Failed - Try Again");
			}
		}

	}

	return (
		<>
			<div className="form-container">
				<h1>Sign Up</h1>
				<form autoComplete="off" onSubmit={handleSubmit} encType="multipart/form-data">
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
					<label>Location</label>
					<input
						type="text"
						name="location"
						value={credentials.location}
						onChange={handleChange}
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
						<label htmlFor="petSeeker"><span>Pet Seeker</span> – I want to find a pet to adopt</label>
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
						<label htmlFor="organization"><span>Organization</span> – I want to list pets for adoption</label>
					</div>
					<br />
					{credentials.role === 'organization' && (
						<>
							<label>Organization Photo:</label>
							<input type="file" accept="image/*" onChange={handleFileChange} />
						</>
					)}
					<button className="btn btn-yellow" type="submit">SIGN UP</button>
				</form>
			</div>
			<p className="error-message">{error}</p>
		</>
	);
}
