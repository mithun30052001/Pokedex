import React, { useCallback } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

type PokemonTypeSelectionProps = {
  selectedType: string | undefined;
  selectType: (type: string | undefined) => void;
};

const POKEMON_TYPES = [
  { value: 'grass', label: 'Grass' },
  { value: 'fire', label: 'Fire' },
  { value: 'water', label: 'Water' },
  { value: 'electric', label: 'Electric' },
  { value: 'bug', label: 'Bug' },
  { value: 'poison', label: 'Poison' },
];

const PokemonTypeSelection: React.FC<PokemonTypeSelectionProps> = ({ selectedType, selectType }) => {
  const handleChange = useCallback((e: any) => {
    selectType(e.target.value);
  }, [selectType]);

  return (
    <FormControl variant="outlined" fullWidth={false} style={{ width: 200 }}>
      <InputLabel id="pokemon-type-label">Pokemon Type</InputLabel>
      <Select
        labelId="pokemon-type-label"
        id="pokemon-type"
        value={selectedType ?? ""}
        onChange={handleChange}
        label="Pokemon Type"
      >
        {POKEMON_TYPES.map((type) => (
          <MenuItem key={type.value} value={type.value}>
            {type.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default PokemonTypeSelection;
