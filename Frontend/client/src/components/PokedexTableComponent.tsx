import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  Checkbox,
} from '@mui/material';

interface PokedexTableProps {
  pokemons: {
    id: number;
    name: string;
    types: string[];
    sprite: string;
  }[];
}

const PokedexTableComponent: React.FC<PokedexTableProps> = ({ pokemons }) => {
  const [orderBy, setOrderBy] = useState<string>('name');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [selected, setSelected] = useState<number[]>([]);

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrderBy(property);
    setOrder(isAsc ? 'desc' : 'asc');
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = pokemons.map((pokemon) => pokemon.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = [...selected, id];
    } else if (selectedIndex === 0) {
      newSelected = [...selected.slice(1)];
    } else if (selectedIndex === selected.length - 1) {
      newSelected = [...selected.slice(0, -1)];
    } else if (selectedIndex > 0) {
      newSelected = [
        ...selected.slice(0, selectedIndex),
        ...selected.slice(selectedIndex + 1),
      ];
    }

    setSelected(newSelected);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  const sortedPokemons = [...pokemons].sort((a, b) => {
    const isAsc = order === 'asc';
    if (orderBy === 'name') {
      return (isAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)) || a.id - b.id;
    }
    return (isAsc ? a.id - b.id : b.id - a.id);
  });

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Checkbox
                indeterminate={selected.length > 0 && selected.length < pokemons.length}
                checked={selected.length === pokemons.length}
                onChange={handleSelectAllClick}
              />
            </TableCell>
            <TableCell sortDirection={orderBy === 'name' ? order : false}>
              <TableSortLabel
                active={orderBy === 'name'}
                direction={orderBy === 'name' ? order : 'asc'}
                onClick={() => handleRequestSort('name')}
              >
                Name
              </TableSortLabel>
            </TableCell >
            <TableCell>Types</TableCell>
            <TableCell>Sprite</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedPokemons.map((pokemon) => (
            <TableRow
              key={pokemon.id}
              hover
              onClick={(event) => handleClick(event, pokemon.id)}
              role="checkbox"
              aria-checked={isSelected(pokemon.id)}
              selected={isSelected(pokemon.id)}
            >
              <TableCell padding="checkbox">
                <Checkbox checked={isSelected(pokemon.id)} />
              </TableCell>
              <TableCell>{pokemon.name}</TableCell>
              <TableCell>{pokemon.types.join(', ')}</TableCell>
              <TableCell>
                <img src={pokemon.sprite} alt={pokemon.name} width={50} height={50} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PokedexTableComponent;
