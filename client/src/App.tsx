import React, { useState } from 'react';
import { Container, Box, Typography } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { trpc } from './utils/trpc';
import { httpBatchLink } from '@trpc/client';
import PokeForm from './components/PokeForm';
import FilterablePokedexTable from './components/FilterablePokedexTable';

const App: React.FC = () => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:4000/trpc',
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Container>
          <Box sx={{ my: 4 }}>
            <Typography variant="h5" gutterBottom>
              Find pokemon by Name
            </Typography>
            <PokeForm />
          </Box>
          <Box>
            <Typography variant="h5" gutterBottom>
              Find pokemon by Type
            </Typography>
            <FilterablePokedexTable />
          </Box>
        </Container>
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default App;
