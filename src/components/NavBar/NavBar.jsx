import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import * as petsAPI from '../../utilities/pets-api';

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav>
      <Link to="pets">Pet Details</Link>
      &nbsp; | &nbsp;
      <Link to="/pets/new">Add a Pet</Link>
      &nbsp;&nbsp;
      <span>Welcome, {user.name}</span>
      &nbsp;&nbsp;<Link to="" onClick={handleLogOut}>Log Out</Link>
    </nav>
  );
}