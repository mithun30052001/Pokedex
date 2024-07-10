import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import { trpc } from '../utils/trpc';
import PokemonRowComponent from './PokemonRowComponent';
import PokedexTableComponent from './PokedexTableComponent';
import { PokemonQueryResult, Pokemon } from '../interface/types';

const PokeFormComponent: React.FC = () => {
  const [input, setInput] = useState('');
  const [searchInput, setSearchInput] = useState<string | string[]>('');
  const [data, setData] = useState<PokemonQueryResult | null>(null);

  const singleInput = typeof searchInput === 'string';
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
  }, [query.data]);

  const handleSubmit = () => {
    const inputs = input.split(/[, ]+/).map((i) => capitalizeFirstLetter(i.trim()));
    setSearchInput(inputs.length > 1 ? inputs : inputs[0]);
  };

  const capitalizeFirstLetter = (input: string): string => {
    return input.charAt(0).toUpperCase() + input.slice(1);
  };

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
        {singleInput ? (
          data && 'id' in data ? (
            <PokemonRowComponent pokemon={data as Pokemon} />
          ) : null
        ) : Array.isArray(data) && data.length > 0 ? (
          <PokedexTableComponent pokemons={data as Pokemon[]} />
        ) : null}
      </Grid>
    </Grid>
  );
};

export default PokeFormComponent;
