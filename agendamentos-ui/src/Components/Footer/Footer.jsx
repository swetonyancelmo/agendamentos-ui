import React from 'react';
import './Footer.css';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="Footer_Principal">
      <div className="Footer_Grid">
        <div className="Footer_Info">
          <h3>Agenda<span>Ai</span></h3>
          <p>Organizando o seu tempo, facilitando sua vida.</p>
        </div>

        <div className="Footer_Links">
          <h4>Navegação</h4>
          <ul>
            <li><a href="#Home">Início</a></li>
            <li><a href="#Ser">Serviços</a></li>
            <li><a href="#sobre">Quem Somos</a></li>
            <li><a href="#contato">Contato</a></li>
          </ul>
        </div>

        <div className="Footer_Social">
          <h4>Siga-nos</h4>
          <div className="Social_Icons">
            <Facebook size={24} />
            <Instagram size={24} />
            <Linkedin size={24} />
          </div>
        </div>
      </div>

      <div className="Footer_Copy">
        <p>&copy; 2026 AgendaAi - Desenvolvido pela <strong>Vanzoff Digital Solutions</strong></p>
      </div>
    </footer>
  );
};

export default Footer;