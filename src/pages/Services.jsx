import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServiceData } from '../redux/ServicesSlice';

const Services = () => {
    const dispatch = useDispatch();
    const { service_data } = useSelector((state) => state.service);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    useEffect(() => {
        dispatch(fetchServiceData());
    }, [dispatch]);

    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    return (
        <div className='container'>
            <h1>Services</h1>
            <div className='row'>
                {service_data?.map((item, key) => (
                    <div
                        key={key}
                        className='col-sm-6 col-md-4 col-lg-3 mb-3'
                        style={{ marginBottom: '20px' }}
                        onMouseEnter={() => handleMouseEnter(key)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div
                            className="card"
                            style={{
                                width: '100%',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                transition: 'transform 0.3s ease-in-out',
                                height: '100%',
                                backgroundColor: hoveredIndex === key ? '#c8d6e5' : '#f8f9fa',
                            }}
                        >
                            <div className="card-body" style={{ height: '100%' }}>
                                <h5 className="card-title">{item?.name}</h5>
                                <p className="card-text">{item?.details?.slice(0, 100)}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Services;
