// AplyCourseSlice                              

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { failurePost, requestPost, successPost } from './action/ApplyCourseAction';

const ApplyCourseSlice = createSlice({
  name: 'services',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
});

export const postStudentData = (studentData) => async (dispatch) => {
  dispatch(requestPost());

  try {
    const response = await axios.post('https://restapinodejs.onrender.com/api/course/apply/649ada0ceac9521c7ef29407', studentData);
    dispatch(successPost(response.data));
  } catch (error) {
    dispatch(failurePost(error.message));
  }
};

export default ApplyCourseSlice.reducer;