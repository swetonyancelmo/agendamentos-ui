import React from 'react';
import { 
  Container, Card, Title, Text, Switch, Stack, 
  Group, Divider, ThemeIcon, Box, useMantineColorScheme 
} from '@mantine/core';
import { 
  IconMoonStars, IconSun, IconBellRinging, 
  IconUserCircle, IconLayout 
} from '@tabler/icons-react';

const Settings = ({ neveAtiva, setNeveAtiva }) => {
  // Hook do Mantine para controlar o Modo Noturno
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <Container size="sm" py="xl" style={{ marginTop: '80px', minHeight: '80vh' }}>
      <Card shadow="xl" padding="xl" radius="lg" withBorder>
        <Stack gap="xl">
          <Group justify="space-between">
            <Box>
              <Title order={2} c={dark ? 'blue.4' : '#003366'}>Configurações</Title>
              <Text size="sm" c="dimmed">Personalize sua experiência na Mais Climatização</Text>
            </Box>
            <ThemeIcon size="xl" radius="md" variant="light" color="blue">
              <IconUserCircle size={30} />
            </ThemeIcon>
          </Group>

          <Divider />

          <section>
            <Group mb="xs">
              <IconLayout size={20} color={dark ? '#4dabf7' : '#003366'} />
              <Text fw={700}>Visual e Interface</Text>
            </Group>
            
            <Stack gap="md" mt="md">
              {/* SWITCH MODO NOTURNO */}
              <Card withBorder radius="md" p="md">
                <Group justify="space-between">
                  <Box>
                    <Text fw={600} size="sm">Modo Noturno</Text>
                    <Text size="xs" c="dimmed">Alterne entre o visual claro e escuro</Text>
                  </Box>
                  <Switch 
                    size="lg"
                    checked={dark}
                    onChange={(event) => setColorScheme(event.currentTarget.checked ? 'dark' : 'light')}
                    onLabel={<IconSun size={16} stroke={2.5} color="yellow" />} 
                    offLabel={<IconMoonStars size={16} stroke={2.5} color="blue" />} 
                  />
                </Group>
              </Card>

              {/* SWITCH DA NEVE */}
              <Card withBorder radius="md" p="md">
                <Group justify="space-between">
                  <Box>
                    <Text fw={600} size="sm">Efeitos de Estação (Neve)</Text>
                    <Text size="xs" c="dimmed">Ativar/Desativar animações de clima na tela</Text>
                  </Box>
                  <Switch 
                    checked={neveAtiva}
                    onChange={(event) => setNeveAtiva(event.currentTarget.checked)}
                    color="teal" 
                    size="md" 
                  />
                </Group>
              </Card>
            </Stack>
          </section>

          <section>
            <Group mb="xs">
              <IconBellRinging size={20} color={dark ? '#4dabf7' : '#003366'} />
              <Text fw={700}>Notificações</Text>
            </Group>
            <Stack gap="sm">
              <Switch label="Lembretes de manutenção por e-mail" defaultChecked />
              <Switch label="Alertas de agendamento via WhatsApp" defaultChecked />
            </Stack>
          </section>

          <Divider />
          <Text size="xs" c="dimmed" ta="center">
            Suas alterações são aplicadas instantaneamente.
          </Text>
        </Stack>
      </Card>
    </Container>
  );
};

export default Settings;