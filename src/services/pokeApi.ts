import {
  PokemonBasicDetails,
  PokemonFullDetails,
  PokemonSpeciesInfo,
} from "../types/pokemon";

const BASE_URL = "https://pokeapi.co/api/v2";

export async function fetchPokemonList(
  limit: number = 20,
  offset: number = 0
): Promise<PokemonBasicDetails[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
    );
    const data = await response.json();

    const detailedPokemons = await Promise.all(
      data.results.map(async (item: { name: string; url: string }) => {
        return await fetchPokemonBasicDetails(item.name);
      })
    );

    return detailedPokemons.filter((p): p is PokemonBasicDetails => p !== null);
  } catch (error) {
    console.error("Error fetching pokemon list:", error);
    return [];
  }
}

export async function fetchPokemonsByType(
  type: string
): Promise<PokemonBasicDetails[]> {
  try {
    const response = await fetch(`${BASE_URL}/type/${type.toLowerCase()}`);
    if (!response.ok) return [];
    const data = await response.json();

    // Take top 60 pokemons for this type to keep loading snappy
    const pokemonsOfType = data.pokemon.slice(0, 60);

    const detailedPokemons = await Promise.all(
      pokemonsOfType.map(async (item: { pokemon: { name: string } }) => {
        return await fetchPokemonBasicDetails(item.pokemon.name);
      })
    );

    return detailedPokemons.filter((p): p is PokemonBasicDetails => p !== null);
  } catch (error) {
    console.error(`Error fetching pokemons for type ${type}:`, error);
    return [];
  }
}

export async function fetchPokemonBasicDetails(
  nameOrId: string | number
): Promise<PokemonBasicDetails | null> {
  try {
    const res = await fetch(`${BASE_URL}/pokemon/${nameOrId}`);
    if (!res.ok) return null;
    const details = await res.json();

    const types = details.types
      ? details.types.map((t: { type: { name: string } }) => t.type.name)
      : ["normal"];

    const image =
      details.sprites?.other?.["official-artwork"]?.front_default ||
      details.sprites?.front_default ||
      "";

    return {
      id: details.id,
      name: details.name,
      image,
      imageBack: details.sprites?.back_default || image,
      types,
    };
  } catch (error) {
    console.error(`Error fetching basic details for ${nameOrId}:`, error);
    return null;
  }
}

export async function fetchPokemonFullDetails(
  nameOrId: string | number
): Promise<PokemonFullDetails | null> {
  try {
    const res = await fetch(`${BASE_URL}/pokemon/${nameOrId}`);
    if (!res.ok) return null;
    const details = await res.json();

    const types = details.types
      ? details.types.map((t: { type: { name: string } }) => t.type.name)
      : ["normal"];

    const abilities = details.abilities
      ? details.abilities.map((a: { ability: { name: string } }) => a.ability.name)
      : [];

    const stats = details.stats
      ? details.stats.map((s: { base_stat: number; stat: { name: string } }) => ({
          name: s.stat.name,
          value: s.base_stat,
        }))
      : [];

    const artwork =
      details.sprites?.other?.["official-artwork"]?.front_default ||
      details.sprites?.front_default ||
      "";

    return {
      id: details.id,
      name: details.name,
      height: details.height,
      weight: details.weight,
      abilities,
      artwork,
      imageFront: details.sprites?.front_default || artwork,
      imageBack: details.sprites?.back_default || artwork,
      types,
      stats,
      criesUrl: details.cries?.latest || details.cries?.legacy,
    };
  } catch (error) {
    console.error(`Error fetching full details for ${nameOrId}:`, error);
    return null;
  }
}

export async function fetchPokemonSpeciesInfo(
  idOrName: string | number
): Promise<PokemonSpeciesInfo> {
  try {
    const res = await fetch(`${BASE_URL}/pokemon-species/${idOrName}`);
    if (!res.ok) return { flavorText: "Deskripsi tidak tersedia.", genus: "Pokémon" };
    const data = await res.json();

    const EnglishFlavor = data.flavor_text_entries?.find(
      (entry: { language: { name: string } }) => entry.language.name === "en"
    );

    const EnglishGenus = data.genera?.find(
      (g: { language: { name: string } }) => g.language.name === "en"
    );

    const flavorText = EnglishFlavor
      ? EnglishFlavor.flavor_text.replace(/[\n\f\r]/g, " ")
      : "Deskripsi Pokédex tidak tersedia.";

    const genus = EnglishGenus ? EnglishGenus.genus : "Pokémon";

    return { flavorText, genus };
  } catch (error) {
    return { flavorText: "Deskripsi Pokédex tidak tersedia.", genus: "Pokémon" };
  }
}
