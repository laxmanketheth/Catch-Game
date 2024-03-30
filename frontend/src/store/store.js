import { configureStore } from "@reduxjs/toolkit";
import scoreSlice from "./scoreSlice";

const store = configureStore({
    reducer: {
        score: scoreSlice
    }
});
export default store