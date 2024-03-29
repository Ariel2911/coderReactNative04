import { createSlice } from '@reduxjs/toolkit';
import * as FilesSystem from 'expo-file-system'; 
import Place from '../models/Place';

const initialState = {
  places: [],
};

const placeSlice = createSlice({
  name: 'place',
  initialState,
  reducers: {
    addPlace: (state, action) => {
      const newPlace = new Place (Date.now(), action.payload.title, action.payload.image);
      state.places.push(newPlace);
    }
  },
});

export const { addPlace } = placeSlice.actions;

export const savePlace = (title, image) => {
  return async (dispatch) => {
    const fileName = image.split("/").pop();
    const Path = FilesSystem.documentDirectory + fileName;

    try {
      await FilesSystem.moveAsync({
        from: image,
        to: Path,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }

    dispatch(addPlace({ title, image: Path }));

  }
}

export default placeSlice.reducer