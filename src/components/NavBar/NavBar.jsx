import { Link, useLocation } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

export default function NavBar({ user, setUser }) {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isAboutPage = location.pathname === '/about'
  const isPetsPage = location.pathname === '/pets'
  const isPetsCreatePage = location.pathname === '/pets/new'
  const isOrgsPage = location.pathname === '/orgs'


  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <div>
          <Link
            className={`navbar-brand ps-3 ${isHomePage ? 'navbar-brand-home' : ''}`} to="/" >
            reHomr
          </Link>
          {user && <span className={`${isHomePage ? 'nav-user-home' : 'nav-user'}`}>| &nbsp; {user && `${user.name}`}</span>}
        </div>
        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
          <span className={`${isHomePage ? 'navbar-toggler-icon-home' : 'navbar-toggler-icon'}`}></span>
        </button>
        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div className="offcanvas-header">
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <Link className={`nav-link ${isHomePage ? 'nav-home' : ''} ${isAboutPage ? 'active' : ''}`} to="/about">About</Link>
              </li>

              <li className="nav-item">
                <Link className={`nav-link ${isHomePage ? 'nav-home' : ''} ${isPetsPage ? 'active' : ''}`} to="/pets"> Pets</Link>
              </li>
              {user && user.role === 'organization' && (
                <li className="nav-item">
                    <Link className={`nav-link ${isHomePage ? 'nav-home' : ''} ${isPetsCreatePage ? 'active' : ''}`} to="/pets/new">Add a Pet</Link>
                </li>
              )}
              <li className="nav-item">
                <Link className={`nav-link ${isHomePage ? 'nav-home' : ''} ${isOrgsPage ? 'active' : ''}`} to="/orgs">Organizations</Link>
              </li>
              {user ? (
                <li className="nav-item"><Link className={`btn btn-yellow-outline nav-btn ${isHomePage ? 'nav-home-logout' : ''}`} to="" onClick={handleLogOut}>Log Out</Link></li>
              ) : (
                <li className="nav-item"><Link className="btn btn-yellow nav-btn" to="/login">Log In/Sign Up</Link></li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}