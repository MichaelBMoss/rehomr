import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
// import HomePage from '../HomePage/HomePage';
import NavBar from '../../components/NavBar/NavBar';
import CreatePetPage from '../CreatePetPage/CreatePetPage';

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
            <NavBar user={user} setUser={setUser} />
            <Routes>
              {/* Route components in here */}
              <Route path="/pets/new" element={<CreatePetPage />} />
              {/* <Route path="/" element={<HomePage />} /> */}
              <Route path="/login" element={<AuthPage setUser={setUser} /> } />
            </Routes>
    </main>
  );
}
