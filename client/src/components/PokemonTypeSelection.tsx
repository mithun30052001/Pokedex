import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

type PokemonTypeSelectionProps = {
  selectedType: string | undefined;
  selectType: (type: string | undefined) => void;
};

const PokemonTypeSelection: React.FC<PokemonTypeSelectionProps> = ({ selectedType, selectType }) => {
  const handleChange = (e: any) => {
    selectType(e.target.value);
  };

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
      </Select>
    </FormControl>
  );
};

export default PokemonTypeSelection;
