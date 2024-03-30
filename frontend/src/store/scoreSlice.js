import { createSlice } from '@reduxjs/toolkit';

const scoreSlice = createSlice({
    name: 'score',
    initialState: [0],
    reducers: {
      addScore(state, action){
        // console.log('this is payload',action.payload);
        // return state + action.payload
        return [...state, action.payload];
      },
      minusScore(state,action){
        // console.log('this is negative payload',action.payload);
        // return state[0]-action.payload
        return state[0] - action.payload;
     
      }
    }
});

export const {  addScore,minusScore } = scoreSlice.actions
export default scoreSlice.reducer;