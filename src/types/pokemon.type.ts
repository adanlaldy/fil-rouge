// Interface pour la réponse API Pokémon
export type IPokemon = {
    pokedex_id: number;
    generation: number;
    category?: string;
    name: {
        fr: string;
        en: string;
        jp: string;
    };
    sprites?: {
        regular: string;
        shiny: string;
        gmax?: string | null;
    };
    types?: Array<{
        name: string;
        image: string;
    } | null>;
    talents?: Array<{
        name: string;
        tc: boolean;
    }>;
}