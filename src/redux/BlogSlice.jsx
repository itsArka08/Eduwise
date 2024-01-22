import {createAsyncThunk,createSlice}from '@reduxjs/toolkit'
import axiosInstance from '../Api/apiUrl'

export const fetchBlog=createAsyncThunk("allBlog/fetch",async()=>{
    try{
      const res= await axiosInstance.get('allBlog');
      return res?.data;

    }catch(error){
        console.log(error);
    }
})

const initialState=({
    blog_data:[],
    status:'success'
})


export const blogSlice=createSlice({
    name:'blog',
    initialState,
    reducer:{
        
    },
    extraReducers:{
        [fetchBlog.pending]:(state)=>{
            state.status="loading......"
            state.blog_data= null
        },
        [fetchBlog.fulfilled]: (state, { payload }) => {
            state.status = "success";
            state.blog_data = payload;
        },
        [fetchBlog.rejected]: (state) => {
            state.status = "rejected";
        }
    }

})



