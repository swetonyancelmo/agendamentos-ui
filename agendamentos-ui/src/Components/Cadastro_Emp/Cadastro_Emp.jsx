import React from 'react';
import './Cadastro_Emp.css';



function Cadastro_Emp() {
    return (

    <div className="app-container">
    <div className="main-wrapper">
        <main className="container">
          <header className="form-header">
            <a href="/">
            <img src="/IMG_VIDEO/Logo_clara.png" alt="Logo Agenda Ai" className="logo" width={140} />
            </a>
            <h2 className="h2">Cadastro de Empresa</h2>
            <title>#Agenda Ai</title>
          </header>

          <form action="/register" method="POST">
            <div className="form-group">
              <label htmlFor="nome">Nome da Empresa</label>
              <input type="text" id="nome" name="empresa_nome" placeholder="Ex: Mais Refrigeração" required />
            </div>

            <div className="form-group">
              <label htmlFor="cnpj">CNPJ</label>
              <input type="text" id="cnpj" name="empresa_cnpj" placeholder="00.000.000/0001-00" required />
            </div>

            <div className="form-group">
              <label htmlFor="fone">Telefone / WhatsApp</label>
              <input type="tel" id="fone" name="empresa_fone" placeholder="(11) 98888-8888" required />
              
            </div>

            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input type="email" id="email" name="empresa_email" placeholder="contato@empresa.com.br" required />
            </div>

            <div className="form-group">
              <label htmlFor="senha">Senha de Acesso</label>
              <input type="password" id="senha" name="empresa_senha" placeholder="Crie uma senha forte" required />
            </div>

            <div className="form-group">
              <label htmlFor="senha">Confirmar Senha</label>
              <input type="password" id="senha" name="empresa_senha" placeholder="Confirme sua senha" required />
            </div>

            <button type="submit" className="btn-enviar">CADASTRAR EMPRESA</button>

            <div style={{ textAlign: 'center', marginTop: '15px' }}>
            <a href="/" onClick={() => window.close()} style={{color: '#ffffff', textDecoration: 'none', fontSize: '14px', fontWeight: '600'  }}>
             Cancelar e Voltar
           </a>
           </div>

              <p className="text-footer">Sua empresa passará por análise técnica.</p>
            </form>
          </main>
        </div>
      </div>
  );
}

export default Cadastro_Emp;