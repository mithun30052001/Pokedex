import React, { useState } from 'react';
import { trpc } from '../utils/trpc';
import PokemonTypeSelection from './PokemonTypeSelection';
import PokedexTable from './PokedexTable';

const FilterablePokedexTable: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string | undefined>(undefined);
  const { data: pokemons } = trpc.getPokemonByType.useQuery(selectedType? selectedType: '');

  return (
    <div>
      <PokemonTypeSelection selectedType={selectedType} selectType={setSelectedType} />
      {pokemons && <PokedexTable pokemons={pokemons} />}
    </div>
  );
};

export default FilterablePokedexTable;
