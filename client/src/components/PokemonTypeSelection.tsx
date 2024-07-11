import React, { useCallback } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

type PokemonTypeSelectionProps = {
  selectedType: string | undefined;
  selectType: (type: string | undefined) => void;
};

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
        <MenuItem value="grass">Grass</MenuItem>
        <MenuItem value="fire">Fire</MenuItem>
        <MenuItem value="water">Water</MenuItem>
        <MenuItem value="electric">Electric</MenuItem>
        <MenuItem value="bug">Bug</MenuItem>
        <MenuItem value="poison">Poison</MenuItem>
      </Select>
    </FormControl>
  );
};

export default PokemonTypeSelection;
