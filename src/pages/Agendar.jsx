import React, { useState, useRef } from 'react';
import { Container, Card, Title, Text, Select, Button, Stack, Group, Textarea, Box, ActionIcon } from '@mantine/core';
import { DateInput, TimeInput } from '@mantine/dates';
import { IconCalendarPlus, IconCheck, IconClock } from '@tabler/icons-react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const Agendar = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const timeInputRef = useRef(null); // Referência para abrir o seletor de hora ao clicar no ícone

  const [form, setForm] = useState({
    cliente: 'Abelardo',
    servico: '',
    data: null,
    horario: '', // Novo campo para a hora
    descricao: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.data || !form.horario) {
      alert("Por favor, selecione a data e o horário.");
      return;
    }

    setLoading(true);

    try {
      const valorFinal = form.servico === 'Instalação' ? 250.0 : 150.0;
      const dataObjeto = new Date(form.data);
      const dataFormatada = dataObjeto.toISOString().split('T')[0];

      const payload = {
        businessId: "b75ea5d5-28a6-4059-b8da-96c2dc9437e8", 
        serviceId: "e1f0f996-93ed-4ea5-9632-66386c5d6e9c", 
        
        // Envia a data e a hora escolhida no formulário
        appointmentDate: dataFormatada,
        startTime: form.horario, 
        
        cliente: form.cliente,
        servico: form.servico,
        descricao: form.descricao || "",
        valor: valorFinal,
        status: 'PENDING'
      };

      console.log("Enviando para o back-end:", payload);

      await api.post('/appointments', payload);

      alert("Solicitação enviada com sucesso!");
      navigate('/dashboard');
    } catch (error) {
      console.error("Erro:", error.response || error);
      alert(error.response?.status === 403 ? "Erro 403: Verifique permissões." : "Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="sm" py="xl" style={{ marginTop: '50px', minHeight: '80vh' }}>
      <Card shadow="xl" padding="xl" radius="lg" withBorder>
        <Stack gap="md">
          <Group justify="space-between">
            <Box>
              <Title order={2} c="#003366">Solicitar Serviço</Title>
              <Text size="sm" c="dimmed">Escolha o dia e horário para sua climatização</Text>
            </Box>
            <IconCalendarPlus size={35} color="#228be6" />
          </Group>

          <form onSubmit={handleSubmit}>
            <Stack gap="md">
              <Select
                label="Qual serviço você precisa?"
                placeholder="Selecione uma opção"
                data={['Instalação', 'Manutenção', 'Reparo Técnico']}
                required
                value={form.servico}
                onChange={(val) => setForm({ ...form, servico: val })}
              />

              <Group grow>
                {/* Campo de Data */}
                <DateInput
                  value={form.data}
                  onChange={(val) => setForm({ ...form, data: val })}
                  label="Data da Visita"
                  placeholder="Selecione o dia"
                  minDate={new Date()}
                  required
                  locale="pt-br"
                  valueFormat="DD/MM/YYYY"
                />

                {/* Novo Campo de Hora */}
                <TimeInput
                  label="Horário"
                  ref={timeInputRef}
                  required
                  value={form.horario}
                  onChange={(e) => setForm({ ...form, horario: e.target.value })}
                  rightSection={
                    <ActionIcon variant="subtle" color="gray" onClick={() => timeInputRef.current.showPicker()}>
                      <IconClock size="1rem" stroke={1.5} />
                    </ActionIcon>
                  }
                />
              </Group>

              <Textarea
                label="Descrição (Opcional)"
                placeholder="Ex: O ar condicionado não está gelando..."
                minRows={3}
                value={form.descricao}
                onChange={(e) => setForm({ ...form, descricao: e.target.value })}
              />

              <Button 
                type="submit" 
                fullWidth 
                size="lg" 
                radius="md" 
                color="blue"
                loading={loading}
                leftSection={<IconCheck size={20} />}
              >
                Confirmar Agendamento
              </Button>
            </Stack>
          </form>
        </Stack>
      </Card>
    </Container>
  );
};

export default Agendar;