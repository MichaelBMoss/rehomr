import { Link } from 'react-router-dom';

export default function HomePage() {

  return (
    <>
      <div className="home-img-overlay"></div>
      <img className="home-img" src="/images/enis-yavuz-KKtuRtGkDys-unsplash.jpg" alt="dog" />
      <div className=" home-hero-wrap">
        <div className=" home-hero">
          <h1 className="home-title">Welcome to reHomr</h1>
          <h2 className="home-tag">Find your furry friend and fill your heart with joy - where every adoption tells a tale of love and a home found</h2>
          <Link className="btn btn-yellow" to="/pets">See All Pets</Link>
        </div>
      </div>
    </>
  );
}