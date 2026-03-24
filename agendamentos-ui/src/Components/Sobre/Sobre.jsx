import React from 'react';
import './Sobre.css';
import { Target, Users, ShieldCheck } from 'lucide-react';

const Sobre = () => {
  return (
    <section className="Sobre_Secao">
      <div className="Sobre_Container">
        <div className="Sobre_Texto">
          <span>CONHEÇA O AGENDAAI</span>
          <h2>Sua ponte para os melhores serviços</h2>
          <p>
         O <strong style={{color: '#2563EB'}}>AgendaAi</strong> nasceu com o objetivo de simplificar a vida de quem busca 
            qualidade e agilidade. Somos uma plataforma que conecta clientes a 
            profissionais qualificados em diversas áreas, desde estética até 
            climatização e manutenção residencial.
          </p>
        </div>

        <div className="Sobre_Cards">
          <div className="Sobre_Card">
            <Target className="Icone_Sobre" size={40} />
            <h3>Nosso Objetivo</h3>
            <p>Eliminar as filas e a espera ao telefone, oferecendo agendamento em tempo real.</p>
          </div>

          <div className="Sobre_Card">
            <Users className="Icone_Sobre" size={40} />
            <h3>Para Todos</h3>
            <p>Seja você um profissional autônomo ou um cliente, o AgendaAi é o seu lugar.</p>
          </div>

          <div className="Sobre_Card">
            <ShieldCheck className="Icone_Sobre" size={40} />
            <h3>Confiança</h3>
            <p>Trabalhamos apenas com parceiros verificados para garantir sua segurança.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sobre;