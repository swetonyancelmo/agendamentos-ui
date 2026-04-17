import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../services/api';
import {
  Container,
  Card,
  Text,
  Table,
  Badge,
  SimpleGrid,
  Group,
  Title,
  Button,
  ThemeIcon,
  Loader,
  Center
} from "@mantine/core";
import { IconCalendarStats, IconHistory, IconPlus } from "@tabler/icons-react";

export default function DashboardCliente() {
  const navigate = useNavigate(); // ✅ Inicializado corretamente
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);

  const buscarMeusAgendamentos = async () => {
    try {
      setLoading(true);
      const response = await api.get('/appointments/my_requests');
      setAgendamentos(response.data);
    } catch (error) {
      console.error("Erro ao buscar seus agendamentos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarMeusAgendamentos();
  }, []);

  if (loading) {
    return (
      <Center style={{ height: '100vh' }}>
        <Loader size="xl" />
      </Center>
    );
  }

  return (
    <Container size="lg" py="xl">
      <Group justify="space-between" mb="xl">
        <Title order={2} c="#003366">
          Meus Agendamentos
        </Title>
        <Button 
          leftSection={<IconPlus size={18} />} 
          color="blue" 
          radius="md"
          onClick={() => navigate('/agenda')} // ✅ Ajustado de /agendar para /agenda
        >
          Novo Agendamento
        </Button>
      </Group>

      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg" mb="xl">
        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Group justify="space-between">
            <Text size="sm" c="dimmed" fw={700}>TOTAL DE PEDIDOS</Text>
            <ThemeIcon color="blue" variant="light" size="lg">
                <IconHistory size={24} />
            </ThemeIcon>
          </Group>
          <Text size="xl" fw={700} mt="md">
            {agendamentos.length.toString().padStart(2, '0')}
          </Text>
        </Card>

        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Group justify="space-between">
            <Text size="sm" c="dimmed" fw={700}>STATUS DO ÚLTIMO</Text>
            <ThemeIcon color="orange" variant="light" size="lg">
                <IconCalendarStats size={24} />
            </ThemeIcon>
          </Group>
          <Text size="xl" fw={700} mt="md">
            {agendamentos[0]?.status || "Sem pedidos"}
          </Text>
        </Card>
      </SimpleGrid>

      <Card shadow="sm" p="lg" radius="md" withBorder>
        <Text fw={700} mb="lg">Histórico de Serviços</Text>
        <Table horizontalSpacing="md" verticalSpacing="md" withTableBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Data</Table.Th>
              <Table.Th>Serviço</Table.Th>
              <Table.Th>Valor</Table.Th>
              <Table.Th>Status</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {agendamentos.length > 0 ? (
              agendamentos.map((item) => (
                <Table.Tr key={item.id}>
                  <Table.Td>
                    {item.appointmentDate 
                      ? new Date(item.appointmentDate + 'T12:00:00').toLocaleDateString('pt-BR') 
                      : '---'}
                  </Table.Td>
                  <Table.Td>{item.serviceName || 'Não informado'}</Table.Td>
                  <Table.Td>
                    R$ {item.price ? Number(item.price).toFixed(2) : "0,00"}
                  </Table.Td>
                  <Table.Td>
                    <Badge
                      color={
                        item.status === "PENDING" ? "orange" : 
                        item.status === "CONFIRMED" ? "green" : "red"
                      }
                      variant="light"
                    >
                      {item.status}
                    </Badge>
                  </Table.Td>
                </Table.Tr>
              ))
            ) : (
              <Table.Tr>
                <Table.Td colSpan={4}>
                   <Center><Text c="dimmed">Você ainda não realizou nenhum agendamento.</Text></Center>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </Card>
    </Container>
  );
}