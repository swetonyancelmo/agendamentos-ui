import React, { useState, useEffect } from 'react';
import './Nav.css';
import api from "../../api/api";

const Nav = ({ onLoginSucesso, forcarAbrir, setForcarAbrir, usuario, aoSair }) => {
    const [modalAberto, setModalAberto] = useState(false);
    const [emailEmpresa, setEmailEmpresa] = useState('');
    const [cpf, setCpf] = useState('');
    const [termoBusca, setTermoBusca] = useState("");

    useEffect(() => {
        if (forcarAbrir) {
            setModalAberto(true);
            setForcarAbrir(false);
        }
    }, [forcarAbrir, setForcarAbrir]);

    const abrirModal = (e) => {
        e.preventDefault();
        setModalAberto(true);
    };

    const fecharModal = () => {
        setModalAberto(false);
    };

    // --- FUNÇÃO DE LOGIN CORRIGIDA ---
   // --- FUNÇÃO DE LOGIN CORRIGIDA ---
    const handleLogin = async (e) => {
        e.preventDefault();

        const dados = {
            email: emailEmpresa,
            password: cpf 
        };

        try {
            let resposta;
            try {
                // Tenta logar como Empresa
                resposta = await api.post('/auth/login', dados);
            } catch (err) {
                // Se falhar, tenta como Cliente
                resposta = await api.post('/auth/customer/login', dados);
            }

            console.log("Sucesso no Login:", resposta.data);
            
            // 1. Salva o Token
            if(resposta.data.token) {
                localStorage.setItem('token', resposta.data.token);
            }

            // 2. ENVIA OS DADOS (com o nome) PARA O APP.JSX
            // Certifique-se de que o Java envia o campo 'name' ou 'nome'
            onLoginSucesso(resposta.data); 
            
            fecharModal();
            
        } catch (erro) {
            console.error("Erro no login:", erro);
            alert("E-mail ou senha incorretos. Verifique seus dados.");
        }
    };
    
    // --- FUNÇÃO DE BUSCA ---
    const handlePesquisar = async (e) => {
        e.preventDefault();
        try {
            const resposta = await api.get('/api/business');
            const empresas = resposta.data;

            const filtradas = empresas.filter(emp =>
                emp.nome.toLowerCase().includes(termoBusca.toLowerCase())
            );

            console.log("Empresas encontradas:", filtradas);
        } catch (erro) {
            console.error("Erro na busca:", erro);
        }
    };

    return (
        <section id="Nav">
            <div className="Cont_Nav" >
                <video autoPlay muted loop id="video-fundo">
                    <source src="/IMG_VIDEO/Vídeo_Estilo_Booksy_Gerado.mp4" type="video/mp4" />
                </video>
                <img src="/IMG_VIDEO/Logo_clara.png" alt="logo" className="Logo" />

                <div className="Botoes_Nav">
                    {usuario ? (
                        <div className="Perfil_Logado">
                            <span className="Nome_User">👤 Olá, {usuario}</span>
                            <button onClick={aoSair} className="btn-sair">Sair</button>
                        </div>
                    ) : ( 
                        <>
                            <a href="#" id="btnAbrirLogin" onClick={abrirModal}>
                                👤 Entrar / Inscreva-Se
                            </a>
                            <a href="/Cadastro_Emp" target='_blank' id="Cadas_Emp">
                                Cadastre a Sua Empresa
                            </a>
                        </>
                    )}
                </div>

                {modalAberto && (
                    <div id="modalLogin" className="modal-overlay" onClick={(e) => e.target === e.currentTarget && fecharModal()}>
                        <div className="Container_Cad">
                            <button className="btn-fechar-topo" onClick={fecharModal}>&times;</button>
                            <h1>Login</h1>
                            <form className="Login_Em" onSubmit={handleLogin}>
                                <input
                                    placeholder="Seu E-mail cadastrado"
                                    type="email"
                                    value={emailEmpresa}
                                    onChange={(e) => setEmailEmpresa(e.target.value)}
                                    required
                                />
                                <input
                                    placeholder="Digite Sua Senha / CPF"
                                    type="password"
                                    value={cpf}
                                    onChange={(e) => setCpf(e.target.value)}
                                    required
                                />
                                <button type="submit" id="SUBMIT">Acessar</button>
                                <a href="/Cadastro_Client" target="_blank">Não sou Cadastrado</a>
                            </form>

                            <div className="divisor-ou">
                                <span className="linha"></span>
                                <span className="texto-ou">ou</span>
                                <span className="linha"></span>
                            </div>

                            <div className="Rede_Social">
                                <button className="btn-social"><i className="fab fa-facebook-f"></i> Continue com Facebook</button>
                                <button className="btn-social"><i className="fab fa-google"></i> Continue com o Google</button>
                                <button className="btn-social"><i className="fab fa-apple"></i> Continue com a Apple</button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="Main">
                    <h1>Agende Com os melhores Profissionais das Áreas</h1>
                    <p>Descubra e reserve profissionais de beleza e bem-estar perto de você</p>
                    
                    <form className="Buscas" onSubmit={handlePesquisar}>
                        <input 
                            id="Pesquisa_Emp" 
                            type="text" 
                            placeholder="🔍 Serviços Ou Empr..." 
                            value={termoBusca}
                            onChange={(e) => setTermoBusca(e.target.value)}
                        />
                        <input id="Localidade" type="text" placeholder="📍 Onde" />
                        <input id="Horario" type="text" placeholder="📆 Quando" />
                        <button type="submit" id="btn_pesquisar">Pesquisar</button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Nav;