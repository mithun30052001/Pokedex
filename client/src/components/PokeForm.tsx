import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { TextField, Button, Grid, Card, CardContent, Typography } from '@mui/material';
import { trpc } from '../utils/trpc';
import PokemonRow from './PokemonRow';
import PokedexTable from './PokedexTable';
import { PokemonQueryResult, Pokemon } from '../interface/types';

const PokeForm: React.FC = () => {
  const [input, setInput] = useState('');
  const [searchInput, setSearchInput] = useState<string | string[]>('');
  const [data, setData] = useState<PokemonQueryResult | null>(null);

  const singleInput = useMemo(() => typeof searchInput === 'string', [searchInput]);
  const query = trpc.getPokemon.useQuery(
    singleInput ? searchInput : (searchInput as string[]),
    {
      enabled: (singleInput && searchInput !== '') || (!singleInput && (searchInput as string[]).length > 0),
      onSuccess: (data) => {
        setData(data as PokemonQueryResult);
      },
    }
  );

  useEffect(() => {
    if (query.data !== undefined) {
      setData(query.data as PokemonQueryResult);
    }
    else{
      setData(null);
    }
  }, [query.data]);

  const handleSubmit = useCallback(() => {
    const inputs = input.split(/[, ]+/).map((i) => capitalizeFirstLetter(i.trim()));
    setSearchInput(inputs.length > 1 ? inputs : inputs[0]);
  }, [input]);

  const capitalizeFirstLetter = useCallback((input: string): string => {
    return input.charAt(0).toUpperCase() + input.slice(1);
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Pokemon Names"
          variant="outlined"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Search
        </Button>
      </Grid>
      <Grid item xs={12}>
        {searchInput && data === null ? (
          <Card>
            <CardContent>
              <Typography variant="h6" align="center">Pokemon not found</Typography>
            </CardContent>
          </Card>
        ) : singleInput ? (
          data && 'id' in data ? (
            <PokemonRow pokemon={data as Pokemon} />
          ) : null
        ) : Array.isArray(data) && data.length > 0 ? (
          <PokedexTable pokemons={data as Pokemon[]} />
        ) : null}
      </Grid>
    </Grid>
  );
};

export default PokeForm;
