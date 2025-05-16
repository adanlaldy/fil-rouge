import CreateTrainer from "../components/create-trainer.tsx";
import {NotFound} from "../components/ui/not-found.tsx";
import {RouteObject} from "react-router-dom";
import AllPokemonsDetails from "../components/all-pokemons-details.tsx";
import RootLayout from "./RootLayout.tsx";
import PokemonDetails from "@/components/pokemon-details.tsx";

const myRoutes: RouteObject[] = [
    {
        path: "/",
        element: <RootLayout/>,
        children: [
            {
                index: true,
                element: <CreateTrainer/>
            },
            {
                path: "all-pokemons",
                element: <AllPokemonsDetails/>
            },
            {
                path: "pokemon/:id",
                element: <PokemonDetails/>
            },
            {
                path: "*",
                element: <NotFound/>
            }
        ]
    }
]

export default myRoutes