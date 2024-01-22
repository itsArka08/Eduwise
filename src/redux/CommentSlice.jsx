import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../Api/apiUrl';

export const fetchCommentData = createAsyncThunk('comment/fetchcommentData', 
async (id) => {
    const response = await axiosInstance.get(`comment/${id}`);
    return response?.data?.post?.comment;
});

export const CommentSlice = createSlice({
    name: 'comment',
    initialState: {
        comment_data: {},
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCommentData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCommentData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.comment_data = action.payload;
            })
            .addCase(fetchCommentData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});



