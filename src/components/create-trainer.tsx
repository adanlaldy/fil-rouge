import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {ITrainer} from "../types/trainer.type";
import {Link} from "react-router-dom";

export default function CreateTrainer() {
    const [trainers, setTrainers] = useState<ITrainer[]>([]);
    const [newTrainer, setNewTrainer] = useState<ITrainer>({name: "", age: 0, pokemonsCaught: 0});

    const onHandleCreateTrainer = (e: React.FormEvent) => {
        e.preventDefault();
        setTrainers(current => [...current, newTrainer]);
        setNewTrainer({name: "", age: 0, pokemonsCaught: 0});
    };

    return (
        <div className="min-h-screen py-10 px-4">
            <div className="max-w-6xl mx-auto space-y-8">
                <section className={'flex items-center justify-between'}>
                    <p className="text-3xl font-bold text-center underline">Gestion des Dresseurs</p>
                    <Link className="text-black hover:text-gray-700 visited:text-black underline" to="/all-pokemons">List pokemons by type</Link>
                </section>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Card 1 - Formulaire Dresseur */}
                    <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold">Créer un Dresseur Pokémon</CardTitle>
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
                                        onChange={e => setNewTrainer({
                                            ...newTrainer,
                                            pokemonsCaught: Number(e.target.value)
                                        })}
                                        className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-300"
                                        required
                                    />
                                </div>

                                <Button type="submit" className="w-full mt-2 text-white bg-blue-600 hover:bg-blue-700 transition">
                                    Ajouter le dresseur
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Card 2 - Liste Dresseurs */}
                    <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold">Dresseurs enregistrés</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {trainers.length === 0 ? (
                                <p className="text-gray-500 italic">Aucun dresseur pour le moment.</p>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {trainers.map((trainer, i) => (
                                        <div
                                            key={i}
                                            className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition"
                                        >
                                            <h3
                                                title={trainer.name}
                                                className="text-lg font-bold text-gray-700 truncate overflow-hidden whitespace-nowrap"
                                            >
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

                </div>
            </div>
        </div>
    )
}
