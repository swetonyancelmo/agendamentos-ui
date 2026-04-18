import '../css/Escolha.css';
import { Link } from 'react-router-dom';
import { Building2, UserCircle } from 'lucide-react';


function ClienteEmpresa() {
    return (
<div className="Escolha-container"> 
<div class="selection-container">
    <div class="selection-card">
            <UserCircle size={48} color="#004aad" strokeWidth={1.5} />
        <h2>Sou Cliente</h2>
        <p>Agende serviços de ar-condicionado com profissionais qualificados da sua região.</p>

         <Link to="/login-cliente">   
        <button class="btn-primary client-btn">Entrar como Cliente →</button>
        </Link>
        <Link to="/cadastro-cliente">
        <button class="btn-secondary">Cadastra-se como Cliente</button>
        </Link>
    </div>

    <div class="selection-card">
        <div class="icon-box company-icon">
            <Building2 size={48} color="#004aad" strokeWidth={1.5} />
        </div>
        <h2>Sou Empresa</h2>
        <p>Gerencie seus agendamentos, serviços e disponibilidade em uma única plataforma.</p>
        
        <Link to="/login-empresa">
        <button class="btn-business company-btn">Entrar como Empresa →</button>
        </Link>

        <Link to="/cadastro-empresa">
            <button className="company-btn">Cadastrar Empresa</button>
        </Link>
    </div>
</div>
</div>
    ) 
}  
export default ClienteEmpresa;