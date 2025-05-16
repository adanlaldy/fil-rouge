import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {ITrainer} from "../types/trainer.type";
import {useAppDispatch} from "@/hooks/useAppDispatch.ts";
import {addCreatedTrainer} from "@/store/slices/trainer-slice.ts";
import {useAppSelector} from "@/hooks/useAppSelector.ts";

export default function CreateTrainer() {
    const [trainers, setTrainers] = useState<ITrainer[]>([]);
    const [newTrainer, setNewTrainer] = useState<ITrainer>({id:1, name: "", age: 0, pokemonsCaught: 0});
    const dispatch = useAppDispatch();
    const createdTrainerIds = useAppSelector(
        (state) => state.trainer.trainerCreatedIds
    )

    const onHandleCreateTrainer = (e: React.FormEvent) => {
        e.preventDefault();
        setTrainers(current => [...current, newTrainer]);
        setNewTrainer({id: 1, name: "", age: 0, pokemonsCaught: 0});
        dispatch(addCreatedTrainer(newTrainer.id));
    };

    return (
        <div className="min-h-screen py-10 px-4">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Card 1 - Formulaire Dresseur */}
                    <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold">Créer un Dresseur Pokémon</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={onHandleCreateTrainer} className="space-y-4">
                                <div>
                                    <label className="block font-semibold text-gray-700">Id</label>
                                    <input
                                        type="text"
                                        value={newTrainer.id}
                                        onChange={e => setNewTrainer({ ...newTrainer, id: Number(e.target.value) })}
                                        className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-300"
                                        required
                                    />
                                </div>
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

                                <Button type="submit" className="w-full mt-2 text-black bg-blue-600 hover:bg-blue-700 transition">
                                    Ajouter le dresseur
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Card 2 - Liste Dresseurs */}
                    <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold">Dresseurs enregistrés</CardTitle>
                            <p>Ids des dresseurs enregistrés : {createdTrainerIds.join(", ")}</p>
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
