import React, { useState,useMemo,useCallback  } from 'react';
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
  TablePagination,
} from '@mui/material';

interface PokedexTableProps {
  pokemons: {
    id: number;
    name: string;
    types: string[];
    sprite: string;
  }[];
}

const PokedexTable: React.FC<PokedexTableProps> = ({ pokemons }) => {
  const [orderBy, setOrderBy] = useState<string>('name');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [selected, setSelected] = useState<number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrderBy(property);
    setOrder(isAsc ? 'desc' : 'asc');
  };

  const handleSelectAllClick = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = pokemons.map((pokemon) => pokemon.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }, [pokemons]);

  const handleClick = useCallback((event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = [...selected, id];
    } else {
      newSelected = selected.filter((selectedId) => selectedId !== id);
    }
    
    setSelected(newSelected);
  }, [selected]);

  const handleChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  const sortedPokemons = useMemo(() => {
    return [...pokemons].sort((a, b) => {
      const isAsc = order === 'asc';
      if (orderBy === 'name') {
        return (isAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)) || a.id - b.id;
      }
      return (isAsc ? a.id - b.id : b.id - a.id);
    });
  }, [pokemons, order, orderBy]);

  const paginatedPokemons = useMemo(() => {
    return sortedPokemons.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [sortedPokemons, page, rowsPerPage]);


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
          {paginatedPokemons.map((pokemon) => (
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
      <TablePagination
        rowsPerPageOptions={[1,5,10, 25]}
        component="div"
        count={pokemons.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default PokedexTable;
