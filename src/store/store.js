import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import collectionSlice from "./collectionSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        collection: collectionSlice
    }
})

export default store;