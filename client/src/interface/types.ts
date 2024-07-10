export interface Pokemon {
    id: number;
    name: string;
    types: string[];
    sprite: string;
  }
  
export type PokemonQueryResult = Pokemon | Pokemon[];
  