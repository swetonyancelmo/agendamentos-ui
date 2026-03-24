import React from 'react';
import './Marketing.css';

const Marketing = ({ abrirLogin, abrirCadastro }) => {
  return (
    <section className="Marketing_Secao">
      <div className="Marketing_Container">
        
        {/* COLUNA 1: FOCO NO CLIENTE */}
        <div className="Marketing_Card Foco_Cliente">
          <div className="Marketing_Conteudo">
            <span>PARA VOCÊ</span>
            <h2>Encontre e Agende os Melhores Serviços perto de você</h2>
            <p>De manicures a climatização. Tudo em um só lugar, rápido e fácil.</p>
            <button className="Btn_Marketing" onClick={abrirLogin}>
              Agendar Agora (Login)
            </button>
          </div>
        </div>

        {/* COLUNA 2: FOCO NA EMPRESA (O que já tínhamos) */}
        <div className="Marketing_Card Foco_Empresa">
          <div className="Marketing_Conteudo">
            <span>PARA SUA EMPRESA</span>
            <h2>Transforme seu negócio com o AgendaAi</h2>
            <p>Gerencie seus clientes, organize sua agenda e cresça com a Vanzoff Digital.</p>
            <button className="Btn_Marketing Btn_Empresa" onClick={abrirCadastro}>
              Cadastre sua Empresa
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Marketing;