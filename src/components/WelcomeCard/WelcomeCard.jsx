import React, { useState } from 'react';
import './WelcomeCard.css';
import { useNavigate } from 'react-router-dom';
import { 
  SimpleGrid, Card, Image, Text, Title, Badge, 
  Group, Container, Box, Modal, List, ThemeIcon 
} from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';

const WelcomeCard = () => {
  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);
  const [servicoSelecionado, setServicoSelecionado] = useState(null);

  const mockServicos = [
    {
      id: 1,
      title: "Instalação",
      description: "Instalação profissional de ar-condicionado com garantia total.",
      detalhes: ["Unidades interna/externa", "Carga de gás", "Garantia de 1 ano"],
      price: "A partir de R$ 250",
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400"
    },
    {
      id: 2,
      title: "Manutenção",
      description: "Limpeza, higienização e recarga de gás para seu conforto.",
      detalhes: ["Higienização bactericida", "Limpeza de filtros", "Teste de rendimento"],
      price: "A partir de R$ 150",
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400" // Corrigi a URL da imagem aqui para teste
    },
    {
      id: 3,
      title: "Reparo Técnico",
      description: "Conserto de placas e compressores com peças originais.",
      detalhes: ["Diagnóstico elétrico", "Troca de sensores", "Reparo em placas"],
      price: "Sob orçamento",
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400"
    }
  ];

  const abrirDetalhes = (servico) => {
    setServicoSelecionado(servico);
    setOpened(true);
  };

  return (
    <Box>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={<Text fw={700} size="lg">{servicoSelecionado?.title}</Text>}
        centered
        radius="md"
      >
        {servicoSelecionado && (
          <Box>
            <Image src={servicoSelecionado.image} radius="md" mb="md" />
            <Text size="sm" mb="md">{servicoSelecionado.description}</Text>
            <List spacing="xs" size="sm" center icon={<ThemeIcon color="teal" size={20} radius="xl"><IconCheck size={12} /></ThemeIcon>}>
              {servicoSelecionado.detalhes.map((d, i) => <List.Item key={i}>{d}</List.Item>)}
            </List>

            <button className="btn-acao-pilula" style={{ width: '100%', marginTop: '20px' }} onClick={() => navigate('/agenda')}>
              <span>Agendar Agora</span>
              <div className="btn-indicator"></div>
            </button>
          </Box>
        )}
      </Modal>

      <Container size="lg" style={{ height: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div className="card-boas-vindas" style={{ width: '100%', maxWidth: '600px' }}>
          <h1>Bem-vindo ao Mais Climatização</h1>
          <p>Olá, Abelardo! Monitore e controle o clima do seu ambiente de forma inteligente e eficiente.</p>
          <button className="btn-acao-pilula" onClick={() => navigate('/dashboard')}>
            <span>Explorar minha agenda</span>
            <div className="btn-indicator"></div>
          </button>
        </div>
      </Container>

      <Container size="lg" py="100px">
        <Title order={2} ta="center" mb="50px" c="#003366" style={{ fontSize: '2rem' }}>
          Nossos Serviços Disponíveis
        </Title>

        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xl">
          {mockServicos.map((servico) => (
            <Card key={servico.id} shadow="md" padding="lg" radius="md" withBorder>
              <Card.Section>
                <Image src={servico.image} height={200} alt={servico.title} />
              </Card.Section>

              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={700} size="lg">{servico.title}</Text>
                <Badge color="blue" variant="filled">Destaque</Badge>
              </Group>

              <Text size="sm" c="dimmed" mb="lg" style={{ minHeight: '45px' }}>{servico.description}</Text>
              <Text fw={800} size="xl" color="#003366" mb="md">{servico.price}</Text>

              <Group gap="xs" grow>
                <button 
                  onClick={() => abrirDetalhes(servico)}
                  style={{ background: '#e7f5ff', color: '#228be6', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}
                >
                  Detalhes
                </button>

                <button className="btn-acao-pilula" onClick={() => navigate('/agenda')} style={{ padding: '8px 15px', height: '45px' }}>
                  <span style={{ fontSize: '14px' }}>Agendar</span>
                  <div className="btn-indicator"></div>
                </button>
              </Group>
            </Card>
          ))}
        </SimpleGrid>

        <Box ta="center" mt="60px" style={{ display: 'flex', justifyContent: 'center' }}>
           <button className="btn-acao-pilula" style={{ width: '300px' }} onClick={() => navigate('/agenda')}>
             <span>Ver todos os serviços</span>
             <div className="btn-indicator"></div>
           </button>
        </Box>
      </Container>
    </Box>
  );
};

export default WelcomeCard;