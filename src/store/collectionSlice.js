import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    collection: [],
    currentCollection: null
}

const collectionSlice = createSlice({
    name: "collection",
    initialState,
    reducers: {
        setCollection: (state, action) => {
            state.collection = action.payload;
        },
        addCollection: (state, action) => {
            state.collection.push(action.payload);
        },
        updateCollection: (state, action) => {
            const index = state.collection.findIndex(
                (collection) => collection.id === action.payload.id
            );
            if (index !== -1) {
                state.collection[index] = action.payload;
            }
        },
        deleteCollection: (state, action) => {
            state.collection = state.collection.filter(
                (collection) => collection.id !== action.payload
            );
        },
        setCurrentCollection: (state, action) => {
            state.currentCollection = action.payload;
        }
    }
})

export const {setCollection, addCollection, updateCollection, deleteCollection, setCurrentCollection} = collectionSlice.actions;
export default collectionSlice.reducer;