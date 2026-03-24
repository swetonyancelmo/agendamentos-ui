import React, { useState } from 'react';
import { Search, ArrowRight, CheckCircle2 } from 'lucide-react';
import api from '../../api/api'; // Certifique-se que o caminho da sua api.js está correto
import './Cadastro_Client.css';

function Cadastro_Client() {
  const [enviado, setEnviado] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    whatsapp: '',
    email: '',
    password: '' // O back-end geralmente pede uma senha no registro
  });

  // Máscara de WhatsApp (00) 00000-0000
  const handleWhatsAppChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    let x = value.match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
    const formatted = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    setFormData({ ...formData, whatsapp: formatted });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCarregando(true);

    // Ajustando os nomes dos campos para o que o Back-end espera
    const dadosParaEnvio = {
      name: formData.nome,
      email: formData.email,
      cpf: formData.cpf.replace(/\D/g, ''), // Remove pontos e traços do CPF
      phone: formData.whatsapp.replace(/\D/g, ''),
      password: formData.password 
    };

    try {
      // ENDPOINT DO SEU AMIGO: /auth/customer/register
      const resposta = await api.post('/auth/customer/register', dadosParaEnvio);
      
      console.log("Cliente cadastrado com sucesso:", resposta.data);
      setEnviado(true);
    } catch (error) {
      console.error("Erro ao cadastrar cliente:", error);
      alert("Erro ao realizar cadastro. Verifique os dados ou tente novamente.");
    } finally {
      setCarregando(false);
    }
  };

  if (enviado) {
    return (
      <main className="container-client">
        <div style={{ textAlign: 'center', padding: '60px 40px' }}>
          <div className="header-icon-sucesso">
            <CheckCircle2 size={32} />
          </div>
          <h2>Cadastro Realizado!</h2>
          <p className="texto-sucesso">
            Olá <strong>{formData.nome.split(' ')[0]}</strong>, seu perfil foi criado. <br />
            Agora você já pode agendar seus serviços favoritos.
          </p>
          <button onClick={() => window.location.href = "/"} className="btn-client btn-voltar">
            Ir para Home
          </button>
        </div>
      </main>
    );
  }

  return (
    <div className="page-wrapper-client">
      <nav className="nav-client">
        <span>Área do Cliente</span>
        <Search size={18} />
      </nav>

      <main className="container-client">
        <header className="header-client">
          <img src="/IMG_VIDEO/Logo_clara.png" alt="Logo AgendaAi" style={{ width: '160px', margin: '0 auto 20px',height:'150px' }} />
          <p>Crie sua conta para agendar</p>
        </header>

        <form onSubmit={handleSubmit} className="form-client">
          <div className="grid-client">
            <div className="group-client full-width">
              <label>Nome Completo</label>
              <input 
                type="text" 
                required 
                placeholder="Ex: João Silva"
                value={formData.nome}
                onChange={(e) => setFormData({...formData, nome: e.target.value})}
              />
            </div>

            <div className="group-client">
              <label>CPF</label>
              <input 
                type="text" 
                required 
                placeholder="000.000.000-00"
                value={formData.cpf}
                onChange={(e) => setFormData({...formData, cpf: e.target.value})}
              />
            </div>

            <div className="group-client">
              <label>WhatsApp</label>
              <input 
                type="tel" 
                required 
                placeholder="(00) 00000-0000"
                value={formData.whatsapp}
                onChange={handleWhatsAppChange}
              />
            </div>

            <div className="group-client full-width">
              <label>E-mail</label>
              <input 
                type="email" 
                required 
                placeholder="exemplo@email.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div className="group-client full-width">
              <label>Crie uma Senha</label>
              <input 
                type="password" 
                required 
                placeholder="Mínimo 6 caracteres"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          <button type="submit" className="btn-client" disabled={carregando}>
            {carregando ? "Processando..." : "Criar Minha Conta"}
            <ArrowRight size={18} />
          </button>
        </form>
      </main>
    </div>
  );
}

export default Cadastro_Client;