import { createSlice } from '@reduxjs/toolkit';

const scoreSlice = createSlice({
    name: 'score',
    initialState: 0,
    reducers: {
      addScore(state, action){
        return  state + action.payload;
      },
      minusScore(state,action){
        return state + action.payload;
      }
    }
});

export const {  addScore,minusScore } = scoreSlice.actions
export default scoreSlice.reducer;