import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    collections: null,
    currentCollection: null
}

const collectionSlice = createSlice({
    name: "collection",
    initialState,
    reducers: {
        setCollection: (state, action) => {
            state.collections = action.payload;
        },
        addCollection: (state, action) => {
            state.collections.push(action.payload);
        },
        updateCollection: (state, action) => {
            const index = state.collections.findIndex(
                (collection) => collection.id === action.payload.id
            );
            if (index !== -1) {
                state.collections[index] = action.payload;
            }
        },
        deleteCollection: (state, action) => {
            state.collections = state.collections.filter(
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