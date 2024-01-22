import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';
import axiosInstance from '../Api/apiUrl';

export const fetchCategory=createAsyncThunk("AllCategory/fetch",async()=>{
    try{
        const res= await axiosInstance.get('showallcategory');
        return res?.data;
    }catch(error){
        console.log(error);
    }
});
export const LatestPost=createAsyncThunk("letest-post/fetch",async()=>{
    try{
        const res= await axiosInstance.get('letest-post');
        return res?.data;
    }catch(error){
        console.log(error);
    }
});

const initialState=({
    category_data:[],
    letest_post_data:[],
    status:'success'
});

export const CategorySlice=createSlice({
    name:'blog',
    initialState,
    reducer:{},
    extraReducers:{
        [fetchCategory.pending]:(state)=>{
            state.status="loading......"
            state.category_data= null
        },
        [fetchCategory.fulfilled]: (state, { payload }) => {
            state.status = "success";
            state.category_data = payload;
        },
        [fetchCategory.rejected]: (state) => {
            state.status = "rejected";
        },

        [LatestPost.pending]:(state)=>{
            state.status="loading......"
            state.letest_post_data= null
        },
        [LatestPost.fulfilled]: (state, { payload }) => {
            state.status = "success";
            state.letest_post_data = payload;
        },
        [LatestPost.rejected]: (state) => {
            state.status = "rejected";
        },
    }

})