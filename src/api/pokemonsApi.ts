import {IPokemon} from "@/types/pokemon.type.ts";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export interface IPokemonWithSprite extends IPokemon {
    regularSprite: string;
}

export const pokemonApi = createApi({
    reducerPath: "pokemonApi",
    baseQuery: fetchBaseQuery({baseUrl: "https://tyradex.vercel.app/api/v1"}),
    tagTypes: ["PokemonGen"],
    endpoints: (builder) => ({

        /**
         * Récupère un Pokémon par son ID.
         */
        getPokemonById: builder.query<IPokemon, number>({
            query: (id) => `pokemon/${id}`,
        }),

        getPokemonsByType: builder.query<IPokemonWithSprite[], string>({
            query: () => 'pokemon', // récupère tous les pokemons
            transformResponse: (response: IPokemon[], _meta, type) => {
                return response
                    .filter(pokemon =>
                        Array.isArray(pokemon.types) &&
                        pokemon.types.some(t => t?.name.toLowerCase() === type.toLowerCase())
                    )
                    .map(pokemon => ({
                        ...pokemon,
                        regularSprite: pokemon.sprites?.regular ?? '',
                    }));
            },
        })
    }),
});

export const {useGetPokemonByIdQuery, useGetPokemonsByTypeQuery} = pokemonApi
