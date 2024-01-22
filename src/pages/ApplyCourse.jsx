import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css'
import { postStudentData } from '../redux/ApplyCourseSlice';


export const ApplyCourse = () => {
    const [student,setStudent]= useState({
        name:"",
        email:"",
        phone:"",
        city:"",
        address:"",
        qualification:"",
        programing_knowledge:"",
        experiance:""

    })

   
    const [error,setError]=useState({});
    const navigate = useNavigate()
    const dispatch=useDispatch()
    const validation = () => {
        let error = {}

        if (!student.name) {
            error.name = "Name is Required"
        }

        if (!student.email) {
            error.email = "Email is Required"
        } else if (
            !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(student.email)
        ) {
            error.email = "Enter a valid Email"
        }

        if (!student.phone) {
            error.phone = "Phone is Required"
        }

        if (!student.city) {
            error.city = "City name is Required"
        }
        if(!student.address){
            error.address="Address is Required"
        }
        if(!student.qualification){
            error.qualification="qualification  is Required"
        }
        if(!student.programing_knowledge){
            error.programing_knowledge="programing_knowledge  is Required"
        }
        if(!student.experiance){
            error.experiance="experiance  is Required"
        }
        return error
    }
    let name, value
    const postUserData=(e)=>{
        name = e.target.name
        value = e.target.value
        setStudent({ ...student, [name]: value })

        if (name === "name") {
            if (value.length === 0) {
                setError({ ...error, name: "@Name is Required" })
                setStudent({ ...student, name: "" })
            } else {
                setError({ ...error, name: "" })
                setStudent({ ...student, name: value })
            }
        }
        if(name==="email"){
            if(value.length===0){
                setError({...error,email:"Email is required"})
                setStudent({...student, email:""})
            }else{
                setError({ ...error, email: "" })
                setStudent({ ...student, email: value })
            }
        }
        if (name === "phone") {
            if (value.length === 0) {
                setError({ ...error, phone: "@Phone is Required" })
                setStudent({ ...student, phone: "" })
            } else {
                setError({ ...error, phone: "" })
                setStudent({ ...student, phone: value })
            }
        }
        if (name === "city") {
            if (value.length === 0) {
                setError({ ...error, city: "@City is Required" })
                setStudent({ ...student, city: "" })
            } else {
                setError({ ...error, city: "" })
                setStudent({ ...student, city: value })
            }
        }
        if (name === "address") {
            if (value.length === 0) {
                setError({ ...error, address: "@address is Required" })
                setStudent({ ...student, address: "" })
            } else {
                setError({ ...error, address: "" })
                setStudent({ ...student, address: value })
            }
        }
        if (name === "qualification") {
            if (value.length === 0) {
                setError({ ...error, class: "@qualification is Required" })
                setStudent({ ...student, qualification: "" })
            } else {
                setError({ ...error, qualification: "" })
                setStudent({ ...student, qualification: value })
            }
        }
        if (name === "programing_knowledge") {
            if (value.length === 0) {
                setError({ ...error, class: "@programing_knowledge is Required" })
                setStudent({ ...student, programing_knowledge: "" })
            } else {
                setError({ ...error, programing_knowledge: "" })
                setStudent({ ...student, programing_knowledge: value })
            }
        }
        if (name === "experiance") {
            if (value.length === 0) {
                setError({ ...error, class: "@experiance is Required" })
                setStudent({ ...student, experiance: "" })
            } else {
                setError({ ...error, experiance: "" })
                setStudent({ ...student, experiance: value })
            }
        }
    }
    
    const SubmitInfo = async e => {
        e.preventDefault()
        let ErrorList = validation()
        setError(validation())

        if (Object.keys(ErrorList).length === 0) {
            dispatch(postStudentData(student))
            navigate('/')
            // let reg = {
            //     name: student.name,
            //     email: student.email,
            //     phone: student.phone,
            //     city: student.city,
            //     address: student.address,
            //     class: student.class,
               
            // }
            // console.log(reg)
        }
    }


    return (
        <>
            <div className='container mt-5'>
                <div className="card" style={{alignItems:'center'}}>
                    <h1>Add Student</h1>
                    <div className="card-body">
                        <form  onSubmit={SubmitInfo}>
                            <div className="form-group">
                                <label for="exampleInputEmail1">Name</label>
                                <input type="text" className="form-control"
                                name='name'
                                value={student.name}
                                onChange={e => postUserData(e)} />
                                 <span style={{ color: "red", marginLeft: "24px" }}> {error.name} </span>
                            </div>
                            <div className="form-group">
                                <label for="exampleInputEmail1">Email</label>
                                <input type="email" className="form-control"
                                name='email'
                                value={student.email}
                                onChange={e => postUserData(e)} />
                                 <span style={{ color: "red", marginLeft: "24px" }}> {error.email} </span>
                            </div>
                            <div className="form-group">
                                <label for="exampleInputEmail1">Phone</label>
                                <input type="text" className="form-control" 
                                name='phone'
                                value={student.phone}
                                onChange={e => postUserData(e)}/>
                                 <span style={{ color: "red", marginLeft: "24px" }}> {error.phone} </span>
                            </div>
                            <div className="form-group">
                                <label for="exampleInputEmail1">City</label>
                                <input type="text" className="form-control" 
                                name='city'
                                value={student.city}
                                onChange={e => postUserData(e)}/>
                                 <span style={{ color: "red", marginLeft: "24px" }}> {error.city} </span>
                            </div>
                            <div className="form-group">
                                <label for="exampleInputEmail1">Address</label>
                                <input type="text" className="form-control" 
                                name='address'
                                value={student.address}
                                onChange={e => postUserData(e)}/>
                                 <span style={{ color: "red", marginLeft: "24px" }}> {error.address} </span>
                            </div>
                            <div className="form-group">
                                <label for="exampleInputEmail1">qualification</label>
                                <input type="text" className="form-control" 
                                name='qualification'
                                value={student.qualification}
                                onChange={e => postUserData(e)}/>
                                 <span style={{ color: "red", marginLeft: "24px" }}> {error.qualification} </span>
                            </div>
                            <div className="form-group">
                                <label for="exampleInputEmail1">Programing Experience</label>
                                <input type="text" className="form-control" 
                                name='programing_knowledge'
                                value={student.programing_knowledge}
                                onChange={e => postUserData(e)}/>
                                 <span style={{ color: "red", marginLeft: "24px" }}> {error.programing_knowledge} </span>
                            </div>
                            <div className="form-group">
                                <label for="exampleInputEmail1">Experiance</label>
                                <input type="text" className="form-control" 
                                name='experiance'
                                value={student.experiance}
                                onChange={e => postUserData(e)}/>
                                 <span style={{ color: "red", marginLeft: "24px" }}> {error.experiance} </span>
                            </div>


                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

