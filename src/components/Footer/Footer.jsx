import React from 'react';
import { Container, Grid, Text, Group, ActionIcon, Stack, Divider, Title } from '@mantine/core';
// Verifique se o "Title" está ali em cima!
import { IconBrandInstagram, IconBrandWhatsapp, IconMail, IconMapPin, IconPhone } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#f8f9fa', borderTop: '1px solid #e9ecef', marginTop: '100px' }}>
      <Container size="lg" py="xl">
        <Grid gutter="xl">
          {/* COLUNA 1: LOGO E SOBRE */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack gap="xs">
              <Title order={3} color="#003366">MAIS CLIMATIZAÇÃO</Title>
              <Text size="sm" c="dimmed" style={{ maxWidth: '300px' }}>
                Especialistas em conforto térmico. Instalação, manutenção e reparos com a qualidade que você merece.
              </Text>
              <Group gap="xs" mt="md">
                <ActionIcon size="lg" variant="subtle" color="blue" component="a" href="https://www.instagram.com/abelardovanzoff" target="_blank">
                  <IconBrandInstagram size={24} />
                </ActionIcon>
                <ActionIcon size="lg" variant="subtle" color="green" component="a" href="https://wa.me/55991999999" target="_blank">
                  <IconBrandWhatsapp size={24} />
                </ActionIcon>
              </Group>
            </Stack>
          </Grid.Col>

          {/* COLUNA 2: LINKS RÁPIDOS */}
          <Grid.Col span={{ base: 6, md: 4 }}>
            <Text fw={700} mb="md" color="#003366">Navegação</Text>
            <Stack gap="xs">
              <Text component={Link} to="/" size="sm" c="dimmed">Home</Text>
              <Text component={Link} to="/dashboard" size="sm" c="dimmed">Meus Agendamentos</Text>
              <Text component={Link} to="/agendar" size="sm" c="dimmed">Solicitar Serviço</Text>
              <Text component={Link} to="/configuracoes" size="sm" c="dimmed">Minha Conta</Text>
            </Stack>
          </Grid.Col>

          {/* COLUNA 3: CONTATO */}
          <Grid.Col span={{ base: 6, md: 4 }}>
            <Text fw={700} mb="md" color="#003366">Contato</Text>
            <Stack gap="sm">
              <Group gap="xs">
                <IconPhone size={18} color="#228be6" />
                <Text size="sm" c="dimmed">(00) 0000-0000</Text>
              </Group>
              <Group gap="xs">
                <IconMail size={18} color="#228be6" />
                <Text size="sm" c="dimmed">contato@maisclima.com.br</Text>
              </Group>
              <Group gap="xs">
                <IconMapPin size={18} color="#228be6" />
                <Text size="sm" c="dimmed">Recife, PE - Brasil</Text>
              </Group>
            </Stack>
          </Grid.Col>
        </Grid>

        <Divider my="xl" />

        <Group justify="space-between">
          <Text size="xs" c="dimmed">
            © 2026 Mais Climatização. Desenvolvido pela Vanzoff.
          </Text>
          <Group gap="xs">
            <Text size="xs" c="dimmed">Termos de Uso</Text>
            <Text size="xs" c="dimmed">Privacidade</Text>
          </Group>
        </Group>
      </Container>
    </footer>
  );
}