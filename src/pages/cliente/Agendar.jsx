import React, { useState, useEffect } from 'react';
import {
  Container, Card, Title, Text, Select, Stack, Group,
  Box, Loader, Center, Alert, Stepper
} from '@mantine/core';
import { IconCalendarPlus, IconCheck, IconInfoCircle, IconBuilding, IconTool, IconCalendar, IconClock } from '@tabler/icons-react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

const Agendar = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Etapa 1 — empresas
  const [fetchingEmpresas, setFetchingEmpresas] = useState(true);
  const [empresas, setEmpresas] = useState([]);

  // Etapa 2 — serviços
  const [fetchingServicos, setFetchingServicos] = useState(false);
  const [servicos, setServicos] = useState([]);

  // Etapa 3 — disponibilidade
  const [fetchingDisponibilidade, setFetchingDisponibilidade] = useState(false);
  const [availabilitySlots, setAvailabilitySlots] = useState([]);
  const [datasDisponiveis, setDatasDisponiveis] = useState([]);
  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);

  const [form, setForm] = useState({
    businessId: '',
    serviceId: '',
    appointmentDate: '',
    startTime: '',
  });

  // Etapa ativa do stepper
  const stepAtivo = !form.businessId ? 0
    : !form.serviceId ? 1
    : !form.appointmentDate ? 2
    : !form.startTime ? 3
    : 4;

  // Carregar empresas ao montar
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login-cliente');
      return;
    }

    const carregarEmpresas = async () => {
      try {
        const response = await api.get('/business');
        const data = Array.isArray(response.data) ? response.data : [];
        setEmpresas(data);
      } catch (error) {
        console.error('Erro ao carregar empresas:', error);
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login-cliente');
          return;
        }
        setErrorMsg('Não foi possível carregar as empresas. Tente novamente.');
      } finally {
        setFetchingEmpresas(false);
      }
    };
    carregarEmpresas();
  }, [navigate]);

  // Ao selecionar empresa → buscar serviços
  const handleSelectEmpresa = async (businessId) => {
    setForm({ businessId, serviceId: '', appointmentDate: '', startTime: '' });
    setServicos([]);
    setAvailabilitySlots([]);
    setDatasDisponiveis([]);
    setHorariosDisponiveis([]);
    setErrorMsg('');
    setFetchingServicos(true);

    try {
      const response = await api.get(`/business/services/${businessId}`);
      const data = Array.isArray(response.data) ? response.data : [];
      setServicos(data);
      if (data.length === 0) {
        setErrorMsg('Esta empresa não possui serviços cadastrados no momento.');
      }
    } catch (error) {
      console.error('Erro ao carregar serviços:', error);
      setErrorMsg('Não foi possível carregar os serviços desta empresa.');
    } finally {
      setFetchingServicos(false);
    }
  };

  // Gera blocos de 1h entre startTime e endTime (ex: "08:00" → "18:00" = 10 slots)
  const gerarBlocos = (startTime, endTime) => {
    const blocos = [];
    const [startH, startM] = startTime.split(':').map(Number);
    const [endH, endM] = endTime.split(':').map(Number);
    const fimEmMinutos = endH * 60 + endM;

    let atual = startH * 60 + startM;
    while (atual < fimEmMinutos) {
      const h = String(Math.floor(atual / 60)).padStart(2, '0');
      const m = String(atual % 60).padStart(2, '0');
      blocos.push(`${h}:${m}`);
      atual += 60;
    }
    return blocos;
  };

  // Ao selecionar serviço → buscar disponibilidade
  const handleSelectServico = async (serviceId) => {
    setForm((prev) => ({ ...prev, serviceId, appointmentDate: '', startTime: '' }));
    setAvailabilitySlots([]);
    setDatasDisponiveis([]);
    setHorariosDisponiveis([]);
    setErrorMsg('');
    setFetchingDisponibilidade(true);

    try {
      const response = await api.get(`/business/availability/${form.businessId}`);
      const data = response.data;

      const slots = Array.isArray(data) ? data
        : Array.isArray(data?.availableSlots) ? data.availableSlots
        : Array.isArray(data?.slots) ? data.slots
        : [];

      setAvailabilitySlots(slots);

      const datas = [...new Set(slots.map((s) => s.date).filter(Boolean))].sort();

      setDatasDisponiveis(
        datas.map((d) => ({
          value: d,
          label: new Date(d + 'T12:00:00').toLocaleDateString('pt-BR', {
            weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric',
          }),
        }))
      );

      if (datas.length === 0) {
        setErrorMsg('Nenhuma data disponível para esta empresa no momento.');
      }
    } catch (error) {
      console.error('Erro ao buscar disponibilidade:', error);
      setErrorMsg('Não foi possível carregar os horários disponíveis.');
    } finally {
      setFetchingDisponibilidade(false);
    }
  };

  // Ao selecionar data → gerar blocos de 1h a partir do startTime/endTime
  const handleSelectData = (date) => {
    setForm((prev) => ({ ...prev, appointmentDate: date, startTime: '' }));
    setErrorMsg('');

    const slotDoDia = availabilitySlots.find((s) => s.date === date);

    let horarios = [];
    if (slotDoDia?.startTime && slotDoDia?.endTime) {
      horarios = gerarBlocos(slotDoDia.startTime, slotDoDia.endTime).map((t) => ({
        value: t,
        label: t,
      }));
    }

    setHorariosDisponiveis(horarios);

    if (horarios.length === 0) {
      setErrorMsg('Nenhum horário disponível para esta data.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!form.businessId || !form.serviceId || !form.appointmentDate || !form.startTime) {
      setErrorMsg('Preencha todos os campos antes de confirmar.');
      return;
    }

    setLoading(true);
    try {
      await api.post('/appointments', {
        serviceId: form.serviceId,
        businessId: form.businessId,
        appointmentDate: form.appointmentDate,
        startTime: form.startTime,
      });
      navigate('/dashboard-cliente', { state: { sucesso: true } });
    } catch (error) {
      console.error('Erro no agendamento:', error.response?.data || error);
      setErrorMsg(error.response?.data?.message || 'Erro ao realizar o agendamento. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const empresasOptions = empresas.map((e) => ({
    value: e.id,
    label: e.businessName || e.name || e.companyName || e.id,
  }));

  const servicosOptions = servicos.map((s) => ({
    value: s.id,
    label: s.serviceName || s.name || s.title || s.id,
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
                Selecione a empresa, o serviço e o horário desejado
              </Text>
            </Box>
            <IconCalendarPlus size={35} color="var(--text-clima-claro)" />
          </Group>

          <Stepper active={stepAtivo} size="xs" color="blue">
            <Stepper.Step icon={<IconBuilding size={14} />} label="Empresa" />
            <Stepper.Step icon={<IconTool size={14} />} label="Serviço" />
            <Stepper.Step icon={<IconCalendar size={14} />} label="Data" />
            <Stepper.Step icon={<IconClock size={14} />} label="Horário" />
          </Stepper>

          {errorMsg && (
            <Alert icon={<IconInfoCircle size={18} />} color="red" radius="md" withCloseButton onClose={() => setErrorMsg('')}>
              {errorMsg}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Stack gap="md">

              {/* Passo 1 — Empresa */}
              <Select
                label="Empresa"
                placeholder={fetchingEmpresas ? 'Buscando empresas...' : 'Selecione uma empresa'}
                disabled={fetchingEmpresas}
                rightSection={fetchingEmpresas ? <Loader size="xs" /> : undefined}
                data={empresasOptions}
                value={form.businessId || null}
                onChange={handleSelectEmpresa}
                required
                searchable
                nothingFoundMessage="Nenhuma empresa encontrada"
                styles={{ label: { color: 'var(--text-site)' } }}
              />

              {/* Passo 2 — Serviço */}
              {form.businessId && (
                fetchingServicos ? (
                  <Center py="xs">
                    <Loader size="sm" />
                    <Text size="sm" ml="sm" c="dimmed">Buscando serviços...</Text>
                  </Center>
                ) : (
                  <Select
                    label="Serviço"
                    placeholder="Selecione um serviço"
                    data={servicosOptions}
                    value={form.serviceId || null}
                    onChange={handleSelectServico}
                    required
                    searchable
                    nothingFoundMessage="Nenhum serviço encontrado"
                    styles={{ label: { color: 'var(--text-site)' } }}
                  />
                )
              )}

              {/* Passo 3 — Data */}
              {form.serviceId && (
                fetchingDisponibilidade ? (
                  <Center py="xs">
                    <Loader size="sm" />
                    <Text size="sm" ml="sm" c="dimmed">Buscando disponibilidade...</Text>
                  </Center>
                ) : datasDisponiveis.length > 0 ? (
                  <Select
                    label="Data disponível"
                    placeholder="Selecione uma data"
                    data={datasDisponiveis}
                    value={form.appointmentDate || null}
                    onChange={handleSelectData}
                    required
                    styles={{ label: { color: 'var(--text-site)' } }}
                  />
                ) : null
              )}

              {/* Passo 4 — Horário */}
              {form.appointmentDate && horariosDisponiveis.length > 0 && (
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

              <button
                type="submit"
                className="btn-acao-pilula"
                style={{ width: '100%', height: '55px', marginTop: '10px' }}
                disabled={loading || fetchingEmpresas || fetchingServicos || fetchingDisponibilidade || !form.startTime}
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
