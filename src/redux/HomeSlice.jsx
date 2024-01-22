import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../Api/apiUrl';

export const fetchBannerData = createAsyncThunk('banner/fetchBannerData', async () => {
  const response = await axiosInstance.get('https://restapinodejs.onrender.com/api/banner');
  return  response?.data?.bannerdata;
});

export const HomeSlice = createSlice({
  name: 'banner',
  initialState: {
    banner_data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBannerData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBannerData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.banner_data = action.payload;
      })
      .addCase(fetchBannerData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});



