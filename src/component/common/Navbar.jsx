import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../redux/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Logouttoggle } = useSelector((state) => state?.Auth);
  const name = localStorage.getItem('name');

  const [hovered, setHovered] = useState(null);

  const log = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-primary" style={{ borderBottom: '3px solid #ffffff' }}>
        <Link className="navbar-brand" to="/" style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.5rem' }}>
          EDUWISE
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" style={{ color: '#fff' }}>
                <button
                  type="button"
                  className={`btn ${hovered === 'home' ? 'btn btn-success' : 'btn-light'}`}
                  onMouseEnter={() => setHovered('home')}
                  onMouseLeave={() => setHovered(null)}
                >
                  Home
                </button>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about" style={{ color: '#fff' }}>
                <button
                  type="button"
                  className={`btn ${hovered === 'about' ? 'btn btn-success' : 'btn-light'}`}
                  onMouseEnter={() => setHovered('about')}
                  onMouseLeave={() => setHovered(null)}
                >
                  About
                </button>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/blog" style={{ color: '#fff' }}>
                <button
                  type="button"
                  className={`btn ${hovered === 'blog' ? 'btn btn-success' : 'btn-light'}`}
                  onMouseEnter={() => setHovered('blog')}
                  onMouseLeave={() => setHovered(null)}
                >
                  Blog
                </button>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/course" style={{ color: '#fff' }}>
                <button
                  type="button"
                  className={`btn ${hovered === 'course' ? 'btn btn-success' : 'btn-light'}`}
                  onMouseEnter={() => setHovered('course')}
                  onMouseLeave={() => setHovered(null)}
                >
                  Course
                </button>
              </Link>
            </li>
            {Logouttoggle ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" style={{ color: 'black' }}>
                    Welcome.... {name}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" onClick={log} style={{ color: '#fff' }}>
                    <button
                      type="button"
                      className={`btn ${hovered === 'logout' ? 'btn-danger' : 'btn-light'}`}
                      onMouseEnter={() => setHovered('logout')}
                      onMouseLeave={() => setHovered(null)}
                    >
                      Logout
                    </button>
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login" style={{ color: '#fff' }}>
                  <button
                    type="button"
                    className={`btn ${hovered === 'login' ? 'btn btn-warning' : 'btn btn-success'}`}
                    onMouseEnter={() => setHovered('login')}
                    onMouseLeave={() => setHovered(null)}
                  >
                    Login
                  </button>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
