import {configureStore} from "@reduxjs/toolkit";
//import pokemonReducer from "./slices/pokemon-slice.ts"
import trainerReducer from "./slices/trainer-slice.ts"
import {pokemonApi} from "@/api/pokemonsApi.ts";
import {setupListeners} from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        //pokemon: pokemonReducer,
        trainer: trainerReducer,
        [pokemonApi.reducerPath]: pokemonApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(pokemonApi.middleware)
})

setupListeners(store.dispatch)
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>