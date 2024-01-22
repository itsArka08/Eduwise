import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTestimonialData } from '../redux/TestimonialSlice';

const Testimonial = () => {
    const dispatch = useDispatch();
    const { testimonial_data } = useSelector((state) => state.testimonial);

    useEffect(() => {
        dispatch(fetchTestimonialData())
    }, [dispatch])
    return (
        <div className='container'>
        <h1>Testimonial</h1>
            <div className='row'>
                {
                    testimonial_data?.map((item, key) => {
                        return (
                            <>
                                <div className='col-sm-6 col-md-4 col-lg-3 mb-3' style={{ marginBottom: '20px' }}>
                                    <div className="card" style={{ width: "14rem", boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', transition: 'transform 0.3s ease-in-out', }}>
                                        <img src={`https://restapinodejs.onrender.com/api/testimonials/photo/${item?._id}`} className="card-img-top" alt="..." style={{ height: "200px", objectFit: 'cover' }} />
                                        <div className="card-body" style={{ backgroundColor: '#f8f9fa', transition: 'background-color 0.3s ease-in-out' }}>
                                            <p className="card-text">{item?.name}</p>
                                        </div>
                                    </div>
                                </div>




                            </>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Testimonial