import { useState } from "react";
import { signUp } from "../../utilities/users-service";

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

  async function handleSubmit(evt) { 
    evt.preventDefault();
    console.log(credentials);
    try {
      const user = await signUp(credentials);
      setUser(user);
    }
  catch {
      setError("Sign Up Failed - Try Again");
    }
  }
    

	return (
		<div>
			<div className="form-container">
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
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={credentials.location}
              onChange={handleChange}
              required
            />
					<label>Role</label>
					<div>
						<label htmlFor="organization">Organization</label>
						<input
							type="radio"
							id="organization"
              name="role"
              value="organization"
              checked={credentials.role === "organization"}
							onChange={handleChange}
							required
						/>
						<label htmlFor="petSeeker">Pet Seeker</label>
						<input
							type="radio"
							id="petSeeker"
							name="role"
              value="petSeeker"
              checked={credentials.role === "petSeeker"} 
							onChange={handleChange}
							required
						/>
					</div>
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
					<button type="submit">SIGN UP</button>
				</form>
			</div>
			<p className="error-message">&nbsp;{error}</p>
		</div>
	);
}
