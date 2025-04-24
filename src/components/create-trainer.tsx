import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { ITrainer } from "../types/trainer.type";
import {IPokemon} from "@/types/pokemon.type.ts";
import {fetchPokemonsByType} from "@/api/pokemons.ts";


// Liste des types pour le combobox
const pokemonTypes: string[] = [
    "Feu", "Eau", "Plante", "Électrique", "Psy",
    "Roche", "Sol", "Glace", "Dragon", "Ténèbres",
    "Fée", "Acier", "Insecte", "Poison", "Vol",
    "Spectre", "Normal", "Combat"
];

export default function CreateTrainer() {
    const [trainers, setTrainers] = useState<ITrainer[]>([]);
    const [newTrainer, setNewTrainer] = useState<ITrainer>({ name: "", age: 0, pokemonsCaught: 0 });
    const [selectedType, setSelectedType] = useState<string>("");
    const [filteredPokemons, setFilteredPokemons] = useState<IPokemon[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const onHandleCreateTrainer = (e: React.FormEvent) => {
        e.preventDefault();
        setTrainers(current => [...current, newTrainer]);
        setNewTrainer({ name: "", age: 0, pokemonsCaught: 0 });
    };

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
        <>
            <h1 className="underline">Gestion des Dresseurs</h1>
            <div className="max-w-6xl mx-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Card 1 - Formulaire Dresseur */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Créer un Dresseur Pokémon</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={onHandleCreateTrainer} className="space-y-4">
                                <div>
                                    <label className="block font-semibold text-gray-700">Nom</label>
                                    <input
                                        type="text"
                                        value={newTrainer.name}
                                        onChange={e => setNewTrainer({ ...newTrainer, name: e.target.value })}
                                        className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-300"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold text-gray-700">Âge</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={newTrainer.age}
                                        onChange={e => setNewTrainer({ ...newTrainer, age: Number(e.target.value) })}
                                        className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-300"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold text-gray-700">Pokémons capturés</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={newTrainer.pokemonsCaught}
                                        onChange={e => setNewTrainer({ ...newTrainer, pokemonsCaught: Number(e.target.value) })}
                                        className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-300"
                                        required
                                    />
                                </div>

                                <Button type="submit" className="w-full mt-2 text-black">
                                    Ajouter le dresseur
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Card 2 - Liste Dresseurs */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Dresseurs enregistrés</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {trainers.length === 0 ? (
                                <p className="text-gray-500 italic">Aucun dresseur pour le moment.</p>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {trainers.map((trainer, i) => (
                                        <div key={i} className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition">
                                            <h3 title={trainer.name} className="text-lg font-bold text-gray-700 truncate overflow-hidden whitespace-nowrap">
                                                {trainer.name}
                                            </h3>
                                            <p className="text-gray-600">Âge : <span className="font-medium">{trainer.age}</span></p>
                                            <p className="text-gray-600">Pokémons capturés : <span className="font-medium">{trainer.pokemonsCaught}</span></p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Card 3 - Filtrer par Type de Pokémon */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Filtrer par type de Pokémon</CardTitle>
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
                                    {pokemonTypes.map((type, idx) => <option key={idx} value={type}>{type}</option>)}
                                </select>
                                {loading && <p>Chargement...</p>}
                                {error && <p className="text-red-500">Erreur : {error}</p>}
                                {filteredPokemons.length > 0 && (
                                    <div className="max-h-64 overflow-y-auto">
                                        {filteredPokemons.map(pokemon => (
                                            <p key={pokemon.pokedex_id} className="text-gray-700">{pokemon.name.fr} ({pokemon.name.en})</p>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </>
    );
}
