import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav>
      <Link to="/">HomePage</Link> | <Link to="/pets/new">Add a Pet</Link>&nbsp;&nbsp;
      {user ? (
        <span>
          Welcome, {user.name} | <Link to="" onClick={handleLogOut}>Log Out</Link>
        </span>
      ) : (
        <Link to="/login">Log In</Link>
      )}
    </nav>
  );
}