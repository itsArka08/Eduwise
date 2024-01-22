import{createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import axiosInstance from '../Api/apiUrl'
const initialState = ({
    status: "idel",
    blog_details:{ }
})

export const BlogDetailspart = createAsyncThunk(`blogdetails`, async (id) => {
    try {
        let res = await axiosInstance.get(`blogdetails/${id}`);
        return res?.data;
    } catch (error) {
        console.log(error);
    }
})

export const BlogDeatilsSlice = createSlice({
    name: "BlogDetails",
    initialState,
   
    extraReducers: {
        [BlogDetailspart.pending]: (state) => {
            state.status = "loading......";
            state.blog_details={} 
        },
        [BlogDetailspart.fulfilled]: (state, { payload }) => {
            state.status = "idle";
            state.blog_details = payload
        },
        [BlogDetailspart.rejected]: (state) => {
            state.status = "Rejected";
        },
    },
})



