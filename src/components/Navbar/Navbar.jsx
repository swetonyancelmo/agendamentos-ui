import React, { useState, useRef } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [indicatorStyle, setIndicatorStyle] = useState({ opacity: 0, left: 0, width: 0 });
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);

  const handleMouseEnter = (e) => {
    if (window.innerWidth <= 768) return;

    const linkRect = e.target.getBoundingClientRect();
    const navRect = navRef.current.getBoundingClientRect();

    setIndicatorStyle({
      opacity: 1,
      left: linkRect.left - navRect.left,
      width: linkRect.width,
    });
  };

  return (
    <>
      <section id="Nav">
        <nav>
          
          <div className="logo">
            <img src="/Images_Clima/logo_hd_suave.png" alt="Logo" />
          </div>

          {/* BOTÃO MOBILE */}
          <div 
            className={`menu-toggle ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>

          <ul 
            className={`nav-links ${menuOpen ? "active" : ""}`} 
            ref={navRef}
            onMouseLeave={() => setIndicatorStyle({ ...indicatorStyle, opacity: 0 })}
          >
            <li><Link to="/" onClick={() => setMenuOpen(false)} onMouseEnter={handleMouseEnter}>Home</Link></li>
            <li><Link to="/agenda" onClick={() => setMenuOpen(false)} onMouseEnter={handleMouseEnter}>Agendar</Link></li>
            <li><Link to="/dashboard" onClick={() => setMenuOpen(false)} onMouseEnter={handleMouseEnter}>Meus Agendamentos</Link></li>
            <li><Link to="/configuracoes" onClick={() => setMenuOpen(false)} onMouseEnter={handleMouseEnter}>Configurações</Link></li>
            <li><Link to="/sair" onClick={() => setMenuOpen(false)} onMouseEnter={handleMouseEnter}>Sair</Link></li>

            <div className="indicator" style={indicatorStyle}></div>
          </ul>

        </nav>
      </section>

      {/* 🔥 OVERLAY (corrige problema de ficar atrás) */}
      <div 
        className={`overlay ${menuOpen ? "active" : ""}`} 
        onClick={() => setMenuOpen(false)}
      ></div>
    </>
  );
};

export default Navbar;