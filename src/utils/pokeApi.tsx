const BASE_URL = "https://pokeapi.co/api/v2";
import type { PokemonDetails, PokemonResult, PokemonSpecies } from "../types/PokemonRes.tsx";

export const getListPokemon = async (page: number) => {
  const response = await fetch(
    `${BASE_URL}/pokemon/?offset=${page * 20}&limit=20`
  );
  if (!response.ok) {
    throw new Error("Could not find list of pokemons");
  }
  return response.json();
};

export const getPokemon = async (results: PokemonResult[]) => {
  return await Promise.all(
    results.map(async (pokemon) => {
      const response = await fetch(pokemon.url);
      if (!response.ok) {
        throw new Error("Could not find details of pokemons");
      }
      const rawData = await response.json();
      return {
        id: rawData.id,
        name: rawData.name,
        image: rawData.sprites.other["official-artwork"].front_default,
        types: rawData.types,
      } as PokemonDetails;
    })
  );
};

export const getDetailsPokemon = async (pokemonId: string) => {
  const response = await fetch(`${BASE_URL}/pokemon/${pokemonId}`);
  if (!response) {
    throw new Error("Could not find the pokemon details");
  }
  const rawData = await response.json();
  return {
    id: rawData.id,
    name: rawData.name,
    image: rawData.sprites.other["official-artwork"].front_default,
    types: rawData.types,
    stats: rawData.stats,
    height: rawData.height,
    weight: rawData.weight,
  } as PokemonDetails;
};

export const getSpeciesPokemon = async (pokemonId: string) => {
  const response = await fetch(`${BASE_URL}/pokemon-species/${pokemonId}`);
  if (!response) {
    throw new Error("Could not find the pokemon details");
  }
  const rawSpecies = await response.json()
  return {
    base_happiness: rawSpecies.base_happiness,
    capture_rate: rawSpecies.capture_rate,
    evolution_chain: rawSpecies.evolution_chain,
    flavor_text_entries: rawSpecies.flavor_text_entries,
    names: rawSpecies.names
  } as PokemonSpecies
};
