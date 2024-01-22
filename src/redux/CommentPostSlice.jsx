// AplyCourseSlice                              

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { failurePost, requestPost, successPost } from './action/ApplyCourseAction';

const CommentPostSlice = createSlice({
  name: 'CommentPostSlice',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
});

export const postcommentData = (studentData) => async (id,dispatch) => {
  dispatch(requestPost());

  try {
    const response = await axios.post(`https://restapinodejs.onrender.com/api/blog/${id}/comment/create`, studentData);
    dispatch(successPost(response.data));
  } catch (error) {
    dispatch(failurePost(error.message));
  }
};

export default CommentPostSlice.reducer;