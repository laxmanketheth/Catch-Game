import { createSlice } from '@reduxjs/toolkit';

const scoreSlice = createSlice({
  name: 'score',
  initialState: {
    score: 0,
    endTime: Date.now()
  },
  reducers: {
    addScore(state, action) {
       state.score += action.payload;
    },
    minusScore(state, action) {
       state.score += action.payload;
    },
    initialiseStates(state, action){
        state.score = 0,
        state.endTime = Date.now() + 64000
    }
  }
});

export const {addScore, minusScore, initialiseStates} = scoreSlice.actions
export default scoreSlice.reducer;