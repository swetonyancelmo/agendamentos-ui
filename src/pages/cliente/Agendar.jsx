import React, { useState, useRef, useEffect } from 'react';
import { Container, Card, Title, Text, Select, Stack, Group, Box, ActionIcon, Loader, Textarea } from '@mantine/core';
import { DateInput, TimeInput } from '@mantine/dates';
import { IconCalendarPlus, IconCheck, IconClock } from '@tabler/icons-react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

const Agendar = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetchingServices, setFetchingServices] = useState(true);
  const [servicosDoBanco, setServicosDoBanco] = useState([]);
  const timeInputRef = useRef(null);

  const [form, setForm] = useState({
    servicoId: '',
    data: null,
    horario: '',
    descricao: '',
  });

  useEffect(() => {
    const carregarServicos = async () => {
      try {
        const response = await api.get('/business/services');
        setServicosDoBanco(response.data);
      } catch (error) {
        console.error("Erro ao carregar serviços:", error);
      } finally {
        setFetchingServices(false);
      }
    };
    carregarServicos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.data || !form.horario || !form.servicoId) {
      alert("Por favor, selecione o serviço, a data e o horário.");
      return;
    }

    setLoading(true);
    try {
      const dataFormatada = form.data.toISOString().split('T')[0];
      const businessId = localStorage.getItem("businessId");

      const payload = {
        ...(businessId ? { businessId } : {}),
        serviceId: form.servicoId,
        appointmentDate: dataFormatada,
        startTime: form.horario,
        descricao: form.descricao,
      };

      await api.post('/appointments', payload);
      alert("Agendamento realizado com sucesso!");
      navigate('/dashboard-cliente');
    } catch (error) {
      console.error("Erro no agendamento:", error.response?.data || error);
      alert(error.response?.data?.message || "Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="sm" py="xl" style={{ marginTop: '50px', minHeight: '80vh' }}>
      <Card shadow="xl" padding="xl" radius="lg" withBorder
        style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
        <Stack gap="md">
          <Group justify="space-between">
            <Box>
              <Title order={2} style={{ color: 'var(--text-clima-claro)' }}>Solicitar Serviço</Title>
              <Text size="sm" style={{ color: 'var(--text-site)', opacity: 0.7 }}>
                Informe os detalhes para nossa visita técnica
              </Text>
            </Box>
            <IconCalendarPlus size={35} color="var(--text-clima-claro)" />
          </Group>

          <form onSubmit={handleSubmit}>
            <Stack gap="md">
              <Select
                label="Qual serviço você precisa?"
                placeholder={fetchingServices ? "Buscando serviços..." : "Selecione uma opção"}
                disabled={fetchingServices}
                rightSection={fetchingServices ? <Loader size="xs" /> : null}
                data={servicosDoBanco.map(s => ({ value: s.id, label: s.serviceName || s.title }))}
                required
                value={form.servicoId}
                onChange={(val) => setForm({ ...form, servicoId: val })}
                styles={{ label: { color: 'var(--text-site)' } }}
              />

              <Group grow>
                <DateInput
                  value={form.data}
                  onChange={(val) => setForm({ ...form, data: val })}
                  label="Data da Visita"
                  placeholder="Dia do atendimento"
                  minDate={new Date()}
                  required
                  locale="pt-br"
                  valueFormat="DD/MM/YYYY"
                  styles={{ label: { color: 'var(--text-site)' } }}
                />

                <TimeInput
                  label="Horário"
                  ref={timeInputRef}
                  required
                  value={form.horario}
                  onChange={(e) => setForm({ ...form, horario: e.target.value })}
                  styles={{ label: { color: 'var(--text-site)' } }}
                  rightSection={
                    <ActionIcon variant="subtle" color="gray"
                      onClick={() => timeInputRef.current?.showPicker()}>
                      <IconClock size="1rem" stroke={1.5} />
                    </ActionIcon>
                  }
                />
              </Group>

              <Textarea
                label="Descrição do Problema"
                placeholder="Conte-nos o que está acontecendo com seu aparelho..."
                minRows={3}
                value={form.descricao}
                onChange={(e) => setForm({ ...form, descricao: e.target.value })}
                styles={{ label: { color: 'var(--text-site)' } }}
              />

              <button
                type="submit"
                className="btn-acao-pilula"
                style={{ width: '100%', height: '55px', marginTop: '20px' }}
                disabled={loading || fetchingServices}
              >
                <Group justify="center" gap="xs">
                  {loading ? <Loader color="white" size="sm" /> : (
                    <>
                      <IconCheck size={20} />
                      <span>Confirmar Agendamento</span>
                    </>
                  )}
                </Group>
                <div className="btn-indicator"></div>
              </button>
            </Stack>
          </form>
        </Stack>
      </Card>
    </Container>
  );
};

export default Agendar;
