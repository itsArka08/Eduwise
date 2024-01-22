import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../Api/apiUrl";

export const fetchCourseData=createAsyncThunk('fetch/course',async()=>{
    const response=await axiosInstance.get(`https://restapinodejs.onrender.com/api/course`)

    return response?.data?.Courses
})

export const CourseSlice = createSlice({
    name: "course",
    initialState: {
        course_data: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCourseData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCourseData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.course_data = action.payload;
            })
            .addCase(fetchCourseData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
})