import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../Api/apiUrl'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'



const initialState = {
  loading: false,
  user: {}, // For user object
  redirectReg: null,
  Logouttoggle: false,//eta false jate logout korle sob nam e na remove hoy
  redirectToLog: null,
  //userName: false
}

//Calling api for registeruser
export const registerUser = createAsyncThunk("/signup", async (user) => {
  try {
    const ress = await axiosInstance.post("register", user);
    return ress?.data;

  } catch (error) {
    toast(error?.response?.data?.msg);
    console.log(error);
  }
});

//Calling api for Login user
export const loginRequest = createAsyncThunk("login", async (user) => {
  try {
    const res = await axiosInstance.post("login", user);
    return res?.data;
  } catch (error) {
    toast(error?.response?.data?.message);
    console.log(error);
  }
});


export const AuthSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {

    //user register korar por jate login e jay tar jonno custom reducer
    redirectTo_Register: (state, { payload }) => {
      state.redirectReg = payload
    },


    //Jodi localstorage theke name remove na kori thle register er por keu jodi login na kore onno keu login kore thle jno tar nam tai dekhay ager jon er noy
    RegLog: (state, { payload }) => {
      localStorage.removeItem("name");
      state.Logouttoggle = false

    },

    //jate login e redirect kore
    redirectToo: (state, { payload }) => {
      state.redirectToLog = payload
    },


    //jate jotokhn na user login korbe totokhn jno kono page open na hoy
    check_token: (state, { payload }) => {
      let token = localStorage.getItem("token");
      if (token !== null && token !== undefined) {
        state.Logouttoggle = true;
      }
    },
    logout: (state, { payload }) => {
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      toast("logout successfully")
      state.Logouttoggle = false

    }
  },

  extraReducers: {
    [registerUser.pending]: (state) => {
      state.loading = true
      state.error = null
    },

    [registerUser.fulfilled]: (state, { payload }) => {

      //Ekn e amra condition debo karon jate register e data pwar por e login page e jay nhle data na peleo forcefully login e page e redirect hye jbe.
      if (payload.success === true) {

        //localstorage e name ta set korabo jate refresh korar por nam ta na ure jay
        localStorage.setItem("name", payload.data.name)

        //ekn e ekta state nbo jate condition true holei ekmatro login e jay
        state.redirectReg = "/login"
        toast(`hey ${payload?.data?.name} Registered successfully`)
      }
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    [loginRequest.pending]: (state, action) => {
      state.loading = true;
    },
    [loginRequest.fulfilled]: (state, { payload }) => {
      if (payload?.status === 200) {
        localStorage.setItem("token", payload?.token);
        localStorage.setItem("name", payload?.user.name);
        state.Logouttoggle = true
        state.redirectTo = "/"
        toast(payload?.message)
      }

    },
    [loginRequest.rejected]: (state, action) => {
      state.loading = false;

    },

  }
})



export const { check_token, redirectToo, logout, redirectTo_Register, RegLog } = AuthSlice.actions







