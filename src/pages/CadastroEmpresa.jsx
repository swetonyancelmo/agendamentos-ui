import Logo from '../assets/logo1.png'
import '../css/index.css'
import Snow from '../components/SnowEffect/SnowEffect.jsx'

function App() {
    return (

      <div className="cadastro-container"> 
      
    

      <div className="app-container">
      <div className="main-wrapper">
        <main className="container">
          <header className="form-header">
            <img src={Logo} alt="Logo Mais Refrigeração" className="logo" width={140} />
            <h2 className="h2">Cadastro de Empresa</h2>
            <title>Cadastro Mais Refrigeração</title>
          </header>

          <form action="/register" method="POST">
            <div className="form-group">
              <label htmlFor="nome">Nome da Empresa</label>
              <input type="text" id="nome" name="empresa_nome" placeholder="Ex: Mais Refrigeração" required />
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
              <input type="password" id="confirmar-senha" name="empresa_senha" placeholder="Confirme sua senha" required />
            </div>

            <button type="submit" className="btn-enviar">CADASTRAR EMPRESA</button>

            </form>
          </main>
        </div>
      </div>
      </div>
    );
  }

export default App;