import React, { useState, useEffect } from 'react';
import {
  Container, Card, Title, Text, Select, Stack, Group,
  Box, Loader, Center, Alert
} from '@mantine/core';
import { IconCalendarPlus, IconCheck, IconInfoCircle } from '@tabler/icons-react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

const Agendar = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [fetchingServices, setFetchingServices] = useState(true);
  const [fetchingAvailability, setFetchingAvailability] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [servicos, setServicos] = useState([]);
  const [availabilitySlots, setAvailabilitySlots] = useState([]);
  const [datasDisponiveis, setDatasDisponiveis] = useState([]);
  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);

  const [form, setForm] = useState({
    serviceId: '',
    businessId: '',
    appointmentDate: '',
    startTime: '',
  });

  useEffect(() => {
    const carregarServicos = async () => {
      try {
        const response = await api.get('/business/services');
        const data = Array.isArray(response.data) ? response.data : [];
        setServicos(data);
      } catch (error) {
        console.error('Erro ao carregar serviços:', error);
        setErrorMsg('Não foi possível carregar os serviços. Tente novamente.');
      } finally {
        setFetchingServices(false);
      }
    };
    carregarServicos();
  }, []);

  const handleSelectServico = async (serviceId) => {
    const servico = servicos.find((s) => s.id === serviceId);
    if (!servico) return;

    setForm({ serviceId, businessId: servico.businessId, appointmentDate: '', startTime: '' });
    setDatasDisponiveis([]);
    setHorariosDisponiveis([]);
    setAvailabilitySlots([]);
    setErrorMsg('');
    setFetchingAvailability(true);

    try {
      const response = await api.get(`/business/availability/${servico.businessId}`);
      const data = response.data;

      let slots = [];

      if (Array.isArray(data)) {
        slots = data;
      } else if (data.availableSlots && Array.isArray(data.availableSlots)) {
        slots = data.availableSlots;
      } else if (data.slots && Array.isArray(data.slots)) {
        slots = data.slots;
      }

      setAvailabilitySlots(slots);

      const datas = [...new Set(slots.map((s) => s.date || s.appointmentDate))].filter(Boolean);
      setDatasDisponiveis(
        datas.map((d) => ({
          value: d,
          label: new Date(d + 'T12:00:00').toLocaleDateString('pt-BR', {
            weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric',
          }),
        }))
      );
    } catch (error) {
      console.error('Erro ao buscar disponibilidade:', error);
      setErrorMsg('Não foi possível carregar os horários disponíveis.');
    } finally {
      setFetchingAvailability(false);
    }
  };

  const handleSelectData = (date) => {
    setForm((prev) => ({ ...prev, appointmentDate: date, startTime: '' }));

    const slotDoDia = availabilitySlots.find(
      (s) => (s.date || s.appointmentDate) === date
    );

    let horarios = [];
    if (slotDoDia) {
      const rawSlots =
        slotDoDia.slots ||
        slotDoDia.times ||
        slotDoDia.availableTimes ||
        slotDoDia.startTimes ||
        [];

      horarios = rawSlots.map((h) => {
        const time = typeof h === 'string' ? h : h.startTime || h.time || '';
        return { value: time, label: time };
      });
    }

    setHorariosDisponiveis(horarios);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!form.serviceId || !form.appointmentDate || !form.startTime) {
      setErrorMsg('Selecione o serviço, a data e o horário.');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        serviceId: form.serviceId,
        businessId: form.businessId,
        appointmentDate: form.appointmentDate,
        startTime: form.startTime,
      };

      await api.post('/appointments', payload);
      navigate('/dashboard-cliente', { state: { sucesso: true } });
    } catch (error) {
      console.error('Erro no agendamento:', error.response?.data || error);
      setErrorMsg(error.response?.data?.message || 'Erro ao realizar o agendamento. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const servicosOptions = servicos.map((s) => ({
    value: s.id,
    label: s.businessName
      ? `${s.serviceName || s.name} — ${s.businessName}`
      : (s.serviceName || s.name || s.title || s.id),
  }));

  return (
    <Container size="sm" py="xl" style={{ marginTop: '50px', minHeight: '80vh' }}>
      <Card
        shadow="xl"
        padding="xl"
        radius="lg"
        withBorder
        style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}
      >
        <Stack gap="lg">
          <Group justify="space-between">
            <Box>
              <Title order={2} style={{ color: 'var(--text-clima-claro)' }}>
                Solicitar Serviço
              </Title>
              <Text size="sm" style={{ color: 'var(--text-site)', opacity: 0.7 }}>
                Escolha o serviço, a data e o horário disponíveis
              </Text>
            </Box>
            <IconCalendarPlus size={35} color="var(--text-clima-claro)" />
          </Group>

          {errorMsg && (
            <Alert icon={<IconInfoCircle size={18} />} color="red" radius="md">
              {errorMsg}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Stack gap="md">

              <Select
                label="Qual serviço você precisa?"
                placeholder={fetchingServices ? 'Buscando serviços...' : 'Selecione um serviço'}
                disabled={fetchingServices}
                rightSection={fetchingServices ? <Loader size="xs" /> : undefined}
                data={servicosOptions}
                value={form.serviceId || null}
                onChange={handleSelectServico}
                required
                searchable
                nothingFoundMessage="Nenhum serviço encontrado"
                styles={{ label: { color: 'var(--text-site)' } }}
              />

              {fetchingAvailability && (
                <Center py="md">
                  <Loader size="sm" />
                  <Text size="sm" ml="sm" c="dimmed">Buscando disponibilidade...</Text>
                </Center>
              )}

              {!fetchingAvailability && form.serviceId && datasDisponiveis.length === 0 && !fetchingServices && (
                <Alert icon={<IconInfoCircle size={18} />} color="yellow" radius="md">
                  Nenhuma data disponível para este serviço no momento.
                </Alert>
              )}

              {datasDisponiveis.length > 0 && (
                <Select
                  label="Data disponível"
                  placeholder="Selecione uma data"
                  data={datasDisponiveis}
                  value={form.appointmentDate || null}
                  onChange={handleSelectData}
                  required
                  styles={{ label: { color: 'var(--text-site)' } }}
                />
              )}

              {horariosDisponiveis.length > 0 && (
                <Select
                  label="Horário disponível"
                  placeholder="Selecione um horário"
                  data={horariosDisponiveis}
                  value={form.startTime || null}
                  onChange={(val) => setForm((prev) => ({ ...prev, startTime: val }))}
                  required
                  styles={{ label: { color: 'var(--text-site)' } }}
                />
              )}

              {form.appointmentDate && horariosDisponiveis.length === 0 && (
                <Alert icon={<IconInfoCircle size={18} />} color="yellow" radius="md">
                  Nenhum horário disponível para a data selecionada.
                </Alert>
              )}

              <button
                type="submit"
                className="btn-acao-pilula"
                style={{ width: '100%', height: '55px', marginTop: '10px' }}
                disabled={loading || fetchingServices || fetchingAvailability || !form.startTime}
              >
                <Group justify="center" gap="xs">
                  {loading ? (
                    <Loader color="white" size="sm" />
                  ) : (
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
