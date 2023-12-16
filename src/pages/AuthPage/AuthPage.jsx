import { useState } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';

export default function AuthPage({ setUser }) {
  const [showSignUp, setShowSignUp] = useState(false);
  return (
    <main className="auth-page-container">
      <div className="auth-page-image-container">
        <h1>Find Your Forever Friend</h1>
        <img className="auth-page-image" src="images/xan-griffin-UCFgM_AojFg-unsplash.jpg" alt="man sitting with dog" />
      </div>
      <div className="auth-page-form">
        {showSignUp ?
          <SignUpForm setUser={setUser} />
          :
          <LoginForm setUser={setUser} />
        }
        <div>
          <div>
            Don't have an account? <button className="form-change-btn" onClick={() => setShowSignUp(!showSignUp)}>{showSignUp ? 'Log In' : 'Sign Up'}</button>
            </div>
        </div>
      </div>
    </main>
  );
}