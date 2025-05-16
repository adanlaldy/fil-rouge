import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {useEffect, useState} from "react";
import {fetchPokemonsByType, IPokemonWithSprite} from "@/api/pokemons.ts";
import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";

// Liste des types pour le combobox
const pokemonTypes: string[] = [
    "Feu", "Eau", "Plante", "Électrik", "Psy",
    "Roche", "Sol", "Glace", "Dragon", "Ténèbres",
    "Fée", "Acier", "Insecte", "Poison", "Vol",
    "Spectre", "Normal", "Combat"
];

export default function AllPokemonsDetails() {
    const [selectedType, setSelectedType] = useState<string>("");
    const [filteredPokemons, setFilteredPokemons] = useState<IPokemonWithSprite[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Récupère les pokémons filtrés via l'API dédiée
    useEffect(() => {
        if (!selectedType) {
            setFilteredPokemons([]);
            return;
        }

        setLoading(true);
        setError(null);

        fetchPokemonsByType(selectedType)
            .then(pokemons => setFilteredPokemons(pokemons))
            .catch(err => setError(err.message ?? 'Erreur de récupération'))
            .finally(() => setLoading(false));
    }, [selectedType]);

    return (
        <div className="flex justify-center items-start min-h-screen px-4 py-8">
            <Card className="w-full max-w-4xl shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Filtrer par type de Pokémon</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <label className="block font-semibold text-gray-700">Type</label>
                        <select
                            value={selectedType}
                            onChange={e => setSelectedType(e.target.value)}
                            className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-300"
                        >
                            <option value="">-- Choisir un type --</option>
                            {pokemonTypes.map((type, idx) => (
                                <option key={idx} value={type}>{type}</option>
                            ))}
                        </select>

                        {loading && <p>Chargement...</p>}
                        {error && <p className="text-red-500">Erreur : {error}</p>}

                        {filteredPokemons.length > 0 && (
                            <div className="max-h-[400px] overflow-y-auto space-y-2">
                                {filteredPokemons.map(pokemon => (
                                    <div className={'flex items-center justify-between'}>
                                        <div key={pokemon.pokedex_id} className="flex items-center gap-4">
                                            <img
                                                src={pokemon.regularSprite}
                                                alt={pokemon.name.en}
                                                className="w-16 h-16 object-contain rounded"
                                            />
                                            <span className="text-gray-700">
                                            {pokemon.name.fr} ({pokemon.name.en})
                                        </span>
                                        </div>
                                        <Link to={`/pokemon-details/${pokemon.pokedex_id}`}>
                                            <Button variant="secondary" size="sm">
                                                Voir les détails
                                            </Button>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}