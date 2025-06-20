export interface PokemonResponse {
  count: number;
  next: string;
  previous: string;
  results: PokemonResult[];
}

export interface PokemonResult {
  name: string;
  url: string;
}

export interface PokemonDetails {
  height: number;
  id: number;
  name: string;
  image: string;
  stats: PokemonStats[];
  types: PokemonType[];
  weight: number;
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonStats {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface PokemonSpecies {
  base_happiness: number;
  capture_rate: number;
  evolution_chain: {
    url: string;
  };
  flavor_text_entries: FlavorText[];
  names: PokemonNames[];
}

export interface FlavorText {
  flavor_text: string;
}

export interface PokemonNames {
  languages: {
      url: string;
    };
    name: string;
}
