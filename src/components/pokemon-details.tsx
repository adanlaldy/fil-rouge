import { useParams } from "react-router-dom";
import { useGetPokemonByIdQuery } from "@/api/pokemonsApi.ts";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";

export default function PokemonDetails() {
    const { id } = useParams<{ id: string }>();

    // Utilise directement le hook RTK Query pour récupérer le Pokémon par id
    const { data: pokemon, error, isLoading } = useGetPokemonByIdQuery(Number(id));

    if (isLoading) return <p>Chargement...</p>;
    if (error) return <p>Erreur lors du chargement du Pokémon.</p>;
    if (!pokemon) return <p>Pokémon introuvable.</p>;

    return <Card className="max-w-sm mx-auto mt-32 shadow-lg rounded-lg overflow-hidden">
        <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
                {pokemon.name.fr} ({pokemon.name.en})
            </CardTitle>
        </CardHeader>

        <CardContent>
            <div className="flex flex-col items-center space-y-4">
                {/* Image principale */}
                <img
                    src={pokemon.sprites?.regular}
                    alt={`${pokemon.name.en} sprite`}
                    className="w-32 h-32 object-contain"
                />

                {/* ID et génération */}
                <p className="text-sm text-gray-500">
                    Pokédex N°: <span className="font-semibold">{pokemon.pokedex_id}</span> — Génération: <span className="font-semibold">{pokemon.generation}</span>
                </p>

                {/* Catégorie */}
                {pokemon.category && (
                    <p className="italic text-gray-600">Catégorie : {pokemon.category}</p>
                )}

                {/* Types */}
                <div className="flex gap-2 flex-wrap justify-center">
                    {pokemon.types?.map((type, idx) =>
                        type ? (
                            <div
                                key={idx}
                                className="flex items-center gap-1 bg-blue-100 rounded px-3 py-1 text-sm font-medium text-blue-800"
                            >
                                <img src={type.image} alt={type.name} className="w-5 h-5" />
                                <span>{type.name}</span>
                            </div>
                        ) : null
                    )}
                </div>

                {/* Talents */}
                {pokemon.talents && pokemon.talents.length > 0 && (
                    <div className="mt-2">
                        <h3 className="font-semibold mb-1">Talents :</h3>
                        <ul className="list-disc list-inside text-sm text-gray-700">
                            {pokemon.talents.map((talent, idx) => (
                                <li key={idx}>
                                    {talent.name} {talent.tc ? "(Talent caché)" : ""}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </CardContent>
    </Card>
}
