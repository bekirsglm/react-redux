import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: JSON.parse(localStorage.getItem("products")) || [], // localStorage’dan yükle
  keyword: "",
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {

    createDataFunc: (state, action) => {
      state.data = [...state.data, action.payload];
      localStorage.setItem("products", JSON.stringify(state.data)); // localStorage’a kaydet
    },

    sortingDataFunc: (state, action) => {
      state.data = [...state.data.sort((a, b) =>
        action.payload === "asc" ? a.price - b.price :
        action.payload === "desc" ? b.price - a.price : 0
      )];
    },

    deleteDataFunc: (state, action) => {
      state.data = state.data.filter(dt => dt.id !== action.payload);
      localStorage.setItem("products", JSON.stringify(state.data)); // güncelle
    },

    updateDataFunc: (state, action) => {
      state.data = state.data.map(dt =>
        dt.id === action.payload.id ? { ...dt, ...action.payload } : dt
      );
      localStorage.setItem("products", JSON.stringify(state.data)); // güncelle
    },

    searchDataFunc: (state, action) => {
      state.keyword = action.payload;
    },
  },
});

export const { createDataFunc, deleteDataFunc, updateDataFunc, sortingDataFunc, searchDataFunc } = dataSlice.actions;

export default dataSlice.reducer;
