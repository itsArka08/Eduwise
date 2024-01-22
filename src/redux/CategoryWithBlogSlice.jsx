import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../Api/apiUrl";

const initialState = ({
    status: "idel",
    categoryBlog: []
})

export const categoryWithBlog = createAsyncThunk(`categortwithBlog`, 
async (id) => {
    try {
        let res = await axiosInstance.get(`category/post/${id}`);
        return res?.data?.data;
    } catch (error) {
        console.log(error);
    }
})

export const CategortWithBlog = createSlice({
    name: "BlogCategory",
    initialState,
    reducers: {
    },
    extraReducers: {
        [categoryWithBlog.pending]: (state) => {
            state.status = "loading......";
            state.categoryBlog = []
        },
        [categoryWithBlog.fulfilled]: (state, { payload }) => {
            state.categoryBlog = payload
        },
        [categoryWithBlog.rejected]: (state) => {
            state.status = "Rejected";
        },
    },
})