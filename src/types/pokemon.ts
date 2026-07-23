export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonBasicDetails {
  id: number;
  name: string;
  image: string;
  imageBack: string;
  types: string[];
}

export interface PokemonStat {
  name: string;
  value: number;
}

export interface PokemonFullDetails {
  id: number;
  name: string;
  height: number; // in decimeters
  weight: number; // in hectograms
  abilities: string[];
  artwork: string;
  imageFront: string;
  imageBack: string;
  types: string[];
  stats: PokemonStat[];
  criesUrl?: string;
}

export interface PokemonSpeciesInfo {
  flavorText: string;
  genus: string;
}
