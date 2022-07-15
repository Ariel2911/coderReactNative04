import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  places: [],
};

const plaseSlice = createSlice({
  name: 'place',
  initialState,
  reducers: {},
});

export default plaseSlice.reducer