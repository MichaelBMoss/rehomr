import { Link, useLocation } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

export default function NavBar({ user, setUser }) {
  const location = useLocation();
  const isHomePage = location.pathname === '/';


  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav className="navbar navbar-expand-md">
      <div className="container-fluid">
        <Link
          className={`navbar-brand ps-3 ${isHomePage ? 'navbar-brand-home' : ''}`} to="/">
          reHomr
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar " aria-controls="offcanvasNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">reHomr</h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <Link className={`nav-link ${isHomePage ? 'nav-home' : ''}`} to="/about">About</Link>
              </li>
              <li className="nav-item dropdown">
                <a className={`nav-link dropdown-toggle ${isHomePage ? 'nav-home' : ''}`} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Pets
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/pets">See All Pets</Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/pets/new">Add a Pet</Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${isHomePage ? 'nav-home' : ''}`} to="/organizations">Organizations</Link>
              </li>
              {user ? (
                <li className="nav-item"><Link className={`nav-link btn btn-primary-outline ${isHomePage ? 'nav-home' : ''}`} to="" onClick={handleLogOut}>Log Out</Link></li>
              ) : (
                <li className="nav-item"><Link className={`nav-link btn btn-primary${isHomePage ? 'nav-home' : ''}`} to="/login">Log In/Sign Up</Link></li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

{/* 
// <nav>
//   <div>
//     <Link to="/">reHomr</Link>
//   </div>
//   <div>
//     <Link>About</Link>
//     <Link>Pets</Link>
//     <Link>Orgs</Link>
//     <Link to="/pets/new">Add a Pet</Link>
//   {user ? (
//     <Link to="" onClick={handleLogOut}>Log Out</Link>
//   ) : (
//     <Link to="/login">Log In</Link>
//   )}
//   </div>
// </nav> */}