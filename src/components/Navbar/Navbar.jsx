import { useState, useRef } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo1.png';

const Navbar = () => {
  const navigate = useNavigate();
  const [indicatorStyle, setIndicatorStyle] = useState({ opacity: 0, left: 0, width: 0 });
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);

  const handleMouseEnter = (e) => {
    if (window.innerWidth > 768 && navRef.current) {
      const linkRect = e.target.getBoundingClientRect();
      const navRect = navRef.current.getBoundingClientRect();
      setIndicatorStyle({
        opacity: 1,
        left: linkRect.left - navRect.left,
        width: linkRect.width,
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('businessId');
    navigate('/');
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <section id="Nav">
      <nav>
        <div className="logo">
          <img src={Logo} alt="Logo Mais Climatização" />
        </div>

        <div className={`menu-icon ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        <ul
          className={`nav-links ${isOpen ? 'active' : ''}`}
          ref={navRef}
          onMouseLeave={() => setIndicatorStyle({ ...indicatorStyle, opacity: 0 })}
        >
          <li><Link to="/" onMouseEnter={handleMouseEnter} onClick={() => setIsOpen(false)}>Home</Link></li>
          <li><Link to="/agendar" onMouseEnter={handleMouseEnter} onClick={() => setIsOpen(false)}>Agendar</Link></li>
          <li><Link to="/dashboard-cliente" onMouseEnter={handleMouseEnter} onClick={() => setIsOpen(false)}>Meus Agendamentos</Link></li>
          <li><Link to="/configuracoes" onMouseEnter={handleMouseEnter} onClick={() => setIsOpen(false)}>Configurações</Link></li>
          <li>
            <button
              onClick={handleLogout}
              onMouseEnter={handleMouseEnter}
            >
              Sair
            </button>
          </li>

          <div className="indicator" style={indicatorStyle}></div>
        </ul>
      </nav>
    </section>
  );
};

export default Navbar;
