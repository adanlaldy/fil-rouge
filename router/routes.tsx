import CreateTrainer from "../src/components/create-trainer";
import {NotFound} from "../src/components/ui/not-found";
import {RouteObject} from "react-router-dom";
import AllPokemonsDetails from "../src/components/all-pokemons-details";
import RootLayout from "./RootLayout";

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
                path: "*",
                element: <NotFound/>
            }
        ]
    }
]

export default myRoutes