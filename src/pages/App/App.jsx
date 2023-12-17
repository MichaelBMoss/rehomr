import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import HomePage from '../HomePage/HomePage'; 
import NavBar from '../../components/NavBar/NavBar';
import CreatePetPage from '../CreatePetPage/CreatePetPage';
import PetDetailPage from '../PetDetailPage/PetDetailPage';
import DeletePetPage from '../DeletePetPage/DeletePetPage';
import UpdatePetPage from '../UpdatePetPage/UpdatePetPage';
import AllPetsPage from '../AllPetsPage/AllPetsPage';
import AboutPage from '../AboutPage/AboutPage';
import OrgsListPage from '../OrgsListPage/OrgsListPage';
import OrgDetailPage from '../OrgDetailPage/OrgDetailPage';

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
            <NavBar user={user} setUser={setUser} />
            <Routes>
              {/* Route components in here */}
              <Route path="/pets" element={<AllPetsPage />} />
              <Route path="/pets/:petId" element={<PetDetailPage />} />
              <Route path="/pets/new" element={<CreatePetPage />} />
              <Route path="/pets/:petId/delete" element={<DeletePetPage />} />
              <Route path="/pets/:petId/update" element={<UpdatePetPage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/login" element={<AuthPage setUser={setUser} /> } />
              <Route path="/orgs" element={<OrgsListPage />} />
              <Route path="/orgs/:orgId" element={<OrgDetailPage />} />
            </Routes>
    </main>
  );
}
