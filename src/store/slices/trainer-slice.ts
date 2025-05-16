import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface TrainerCreatedState {
    trainerCreatedIds: number[]
}

const initialState: TrainerCreatedState = {
    trainerCreatedIds: []
}

const trainerSlice = createSlice({
    name: "trainer",
    initialState,
    reducers: {
        addCreatedTrainer: (state, action: PayloadAction<number>) => {
            state.trainerCreatedIds.push(action.payload)
        },

        removeCreatedTrainer: (state, action: PayloadAction<number>) => {
            state.trainerCreatedIds = state.trainerCreatedIds.filter(
                (id) => id !== action.payload
            )
        }
    }
})

export const {addCreatedTrainer, removeCreatedTrainer} =
    trainerSlice.actions
export default trainerSlice.reducer