import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../Api/apiUrl';

export const fetchTeamData = createAsyncThunk('team/fetchTeamData', async () => {
  const response = await axiosInstance.get('https://restapinodejs.onrender.com/api/team');
  return  response?.data?.TeamMember;
});

export const TeamSlice = createSlice({
  name: 'banner',
  initialState: {
    team_data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeamData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTeamData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.team_data = action.payload;
      })
      .addCase(fetchTeamData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});



