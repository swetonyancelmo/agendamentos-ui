import React, { useState, useRef } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [indicatorStyle, setIndicatorStyle] = useState({ opacity: 0, left: 0, width: 0 });
  const navRef = useRef(null);

  const handleMouseEnter = (e) => {
    const linkRect = e.target.getBoundingClientRect();
    const navRect = navRef.current.getBoundingClientRect();
    
    setIndicatorStyle({
      opacity: 1,
      left: linkRect.left - navRect.left,
      width: linkRect.width,
    });
  };

  return (
    <section id="Nav">
      <nav>
        <div className="logo">
         <img src="/Images_Clima/logo_hd_suave.png" alt="Logo" />
        </div>
      <ul className="nav-links" ref={navRef} onMouseLeave={() => setIndicatorStyle({ ...indicatorStyle, opacity: 0 })}>
  {/* Troque o <a> pelo <Link> e o 'href' pelo 'to' */}
           <li><Link to="/" onMouseEnter={handleMouseEnter}>Home</Link></li>
           <li><Link to="/agenda" onMouseEnter={handleMouseEnter}>Agendar</Link></li>
           <li><Link to="/dashboard" onMouseEnter={handleMouseEnter}>Meus Agendamentos</Link></li>
           <li><Link to="/configuracoes" onMouseEnter={handleMouseEnter}>Configurações</Link></li>
           <li><Link to="/sair" onMouseEnter={handleMouseEnter}>Sair</Link></li>
  <div className="indicator" style={indicatorStyle}></div>
      </ul>
      </nav>
    </section>
  );
};

export default Navbar;