import {configureStore} from "@reduxjs/toolkit";
//import pokemonReducer from "./slices/pokemon-slice.ts"
import trainerReducer from "./slices/trainer-slice.ts"

export const store = configureStore({
    reducer: {
        //pokemon: pokemonReducer,
        trainer: trainerReducer
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>