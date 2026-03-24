import React from 'react';
import './Services.css'; 

const Services = () => {
  const listaServicos = [
    { 
      id: 1, 
      nome: 'Manicure e Pedicure', 
      empresa: 'Studio Nails Art', 
      preco: '60,00', 
      img: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400' 
    },
    { 
      id: 2, 
      nome: 'Corte de Cabelo Masculino', 
      empresa: 'Barbearia Premium', 
      preco: '45,00', 
      img: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400' 
    },
    { 
      id: 3, 
      nome: 'Limpeza de Ar-Condicionado', 
      empresa: 'AgendaAi Clima', 
      preco: '150,00', 
      img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400' 
    },
    { 
        id: 4, 
        nome: 'Massagem Relaxante', 
        empresa: 'Zen Spa Urbano', 
        preco: '120,00', 
        img: 'https://images.unsplash.com/photo-1544161515-4ae6ce6ca8b8?w=400' 
      }
  ];
  const handleAgendamento = async (servicoId) => {
    try {
        const response = await fetch('http://localhost:8080/api/agendamentos', { // URL da API do seu amigo
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idServico: servicoId,
                dataAgendamento: new Date(),
                // Aqui você enviaria o CPF/Email que pegamos no Login
            }),
        });

        if (response.ok) {
            alert("Agendamento solicitado com sucesso!");
        }
    } catch (error) {
        console.error("Erro ao conectar com o servidor:", error);
    }
};

  return (
    <section className="Secao_Servicos">
      <div className="Header_Servicos">
        <h2>Serviços Populares</h2>
        <p>Os melhores profissionais perto de você</p>
      </div>
      
      <div className="Grid_Servicos">
        {listaServicos.map((servico) => (
          <div key={servico.id} className="Card_Agenda">
            <div className="Capa_Foto" style={{ backgroundImage: `url(${servico.img})` }}></div>
            <div className="Conteudo_Card">
              <span className="Tag_Categoria">Populares</span>
              <h3>{servico.nome}</h3>
              <p className="Nome_Empresa">{servico.empresa}</p>
              <div className="Footer_Card">
                <span className="Preco_Txt">R$ {servico.preco}</span>
                <button className="Btn_Reservar" onClick={() => handleAgendamento(servico.id)}>
                  Reservar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;