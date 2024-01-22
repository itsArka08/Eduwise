import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../Api/apiUrl';

export const fetchServiceData = createAsyncThunk('service/fetchServiceData', async () => {
  const response = await axiosInstance.get('https://restapinodejs.onrender.com/api/service');
  return  response?.data?.data;
});

export const ServiceSlice = createSlice({
  name: 'service',
  initialState: {
    service_data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServiceData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchServiceData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.service_data = action.payload;
      })
      .addCase(fetchServiceData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});



