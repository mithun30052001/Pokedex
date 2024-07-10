import React, { useState } from 'react';
import { trpc } from '../utils/trpc';
import PokemonTypeSelection from './PokemonTypeSelection';
import PokedexTable from './PokedexTable';
import { Card, CardContent, Typography } from '@mui/material';

const FilterablePokedexTable: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string | undefined>(undefined);
  const { data: pokemons } = trpc.getPokemonByType.useQuery(selectedType? selectedType: '');

  return (
    <div>
      <PokemonTypeSelection selectedType={selectedType} selectType={setSelectedType} />
      {pokemons && pokemons?.length > 0 ? (
        <PokedexTable pokemons={pokemons} />
      ) : (
        selectedType && (
          <Card>
            <CardContent>
              <Typography variant="h6" align="center">
                No Pokemon available for the selected type
              </Typography>
            </CardContent>
          </Card>
        )
      )}
    </div>
  );
};

export default FilterablePokedexTable;
