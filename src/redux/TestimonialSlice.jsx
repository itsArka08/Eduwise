import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../Api/apiUrl';

export const fetchTestimonialData = createAsyncThunk('testimonial/fetchTestimonialData', async () => {
  const response = await axiosInstance.get('https://restapinodejs.onrender.com/api/testimonial');
  return  response?.data?.testimonials;
});

export const TestimonialSlice = createSlice({
  name: 'testimonial',
  initialState: {
    testimonial_data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestimonialData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTestimonialData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.testimonial_data = action.payload;
      })
      .addCase(fetchTestimonialData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});



