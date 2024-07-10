import React from 'react';
import { TableRow, TableCell, Typography } from '@mui/material';

interface PokemonRowProps {
  pokemon: {
    id: number;
    name: string;
    types: string[];
    sprite: string;
  };
}

const PokemonRowComponent: React.FC<PokemonRowProps> = ({ pokemon}) => (
  <TableRow>
    <TableCell>
      <img src={pokemon.sprite} alt={pokemon.name} width={50} height={50} />
    </TableCell>
    <TableCell>
      <Typography variant="body1">{pokemon.name}</Typography>
    </TableCell>
    <TableCell>
      <Typography variant="body2">{pokemon.types.join(', ')}</Typography>
    </TableCell>
  </TableRow>
);

export default PokemonRowComponent;