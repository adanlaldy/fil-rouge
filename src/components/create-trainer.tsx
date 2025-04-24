import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {ITrainer} from "../types/trainer.type.ts";
import {useState} from "react";

export default function CreateTrainer() {
    const [trainers, setTrainers] = useState<ITrainer[]>([]);
    const [newTrainer, setNewTrainer] = useState<ITrainer>({
        name: "",
        age: 0,
        pokemonsCaught: 0
    });

    const onHandleCreateTrainer = (e: React.FormEvent) => {
        e.preventDefault();
        setTrainers([...trainers, newTrainer]);
        setNewTrainer({name: "", age: 0, pokemonsCaught: 0});
    };

    return (
        <>
            <h1 className={'underline'}>Trainers manager</h1>
            <div className="max-w-6xl mx-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Card - Create Trainer Form */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Create a Pokémon Trainer</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={onHandleCreateTrainer} className="space-y-4">
                                <div>
                                    <label className="block font-semibold text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        value={newTrainer.name}
                                        onChange={(e) =>
                                            setNewTrainer({...newTrainer, name: e.target.value})
                                        }
                                        className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-300"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold text-gray-700">Age</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={newTrainer.age}
                                        onChange={(e) =>
                                            setNewTrainer({...newTrainer, age: Number(e.target.value)})
                                        }
                                        className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-300"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold text-gray-700">Captured Pokémon</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={newTrainer.pokemonsCaught}
                                        onChange={(e) =>
                                            setNewTrainer({...newTrainer, pokemonsCaught: Number(e.target.value)})
                                        }
                                        className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-300"
                                        required
                                    />
                                </div>

                                <Button type="submit" className="w-full mt-2 text-black">
                                    Add Trainer
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Right Card - Trainer List */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Registered Trainers</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {trainers.length === 0 ? (
                                <p className="text-gray-500 italic">No trainers yet.</p>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {trainers.map((t, index) => (
                                        <div
                                            key={index}
                                            className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition"
                                        >
                                            <h3
                                                title={t.name}
                                                className="text-lg font-bold text-gray-700 truncate overflow-hidden whitespace-nowrap"
                                            >
                                                {t.name}
                                            </h3>
                                            <p className="text-gray-600">Age: <span
                                                className="font-medium">{t.age}</span></p>
                                            <p className="text-gray-600">Captured Pokémon: <span
                                                className="font-medium">{t.pokemonsCaught}</span></p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
