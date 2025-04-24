import {IPokemon} from "@/types/pokemon.type.ts";

const BASE_URL = 'https://tyradex.vercel.app/api/v1';

/**
 * Récupère tous les Pokémon.
 */
export async function fetchAllPokemons(): Promise<IPokemon[]> {
    const res = await fetch(`${BASE_URL}/pokemon`);
    if (!res.ok) throw new Error(`Failed to fetch all pokemons: ${res.status}`);
    return res.json();
}

export interface IPokemonWithSprite extends IPokemon {
    regularSprite: string;
}


/**
 * Filtre la liste complète des Pokémon par type.
 * @param type - Nom du type (ex: "eau")
 */
export async function fetchPokemonsByType(
    type: string
): Promise<IPokemonWithSprite[]> {
    const all = await fetchAllPokemons();
    const filtered = all.filter((pokemon) =>
        Array.isArray(pokemon.types) &&
        pokemon.types.some(
            (t) => t?.name.toLowerCase() === type.toLowerCase()
        )
    );
    // Ajoute la sprite regular à chaque Pokémon filtré
    return filtered.map((pokemon) => ({
        ...pokemon,
        regularSprite: pokemon.sprites?.regular ?? ""
    }));
}
