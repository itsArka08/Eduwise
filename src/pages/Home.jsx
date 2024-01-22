import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Carousel } from 'react-bootstrap';
import { fetchBannerData } from '../redux/HomeSlice';
import Courses from './Courses';
import Team from './Team';
import Testimonial from './Testimonial';
import Services from './Services';

const Home = () => {
  const dispatch = useDispatch();
  const { banner_data } = useSelector((state) => state.banner);

  useEffect(() => {
    dispatch(fetchBannerData());
  }, [dispatch]);

  console.log(banner_data);

  return (
    <>
    <div className="col-sm-12">
      <Carousel interval={5000} pause={false}>
        {banner_data?.map((item) => (
          <Carousel.Item key={item._id}>
            <img
              style={{ height: '620px', width: '100%' }}
              className="d-block w-100"
              src={`https://restapinodejs.onrender.com/api/banner/photo/${item?._id}`}
              alt={item.title}
            />
            <div
              className="banner-text"
              style={{
                border: '2px solid #9132a8',
                width: '900px',
                height: '200px',
                position: 'absolute',
                bottom: '50px',
                left: '50%',
                marginLeft: '-450px',
                background: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                padding: '5px',
                transition: 'top 0.5s ease-in-out',
              }}
            >
              <h3 style={{ fontFamily: 'Times', color: 'white' }}>{item?.title}</h3>
              <h6 style={{ fontFamily: 'Times', color: 'white', height: '100px' }}>{item?.description}</h6>
              <center>
                <button type="button" className="btn btn-success">
                  Read More
                </button>
              </center>
              <br />
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
      <div className="container mt-4">
        <div className="row g-4">


          <div className="col-sm-12" style={{marginBottom:"50px",backgroundColor:"'#f8f9fa'"}}>
            <div className="container p-4 border rounded">
              <Services />
            </div>
          </div>

          <div className="col-sm-12" style={{marginBottom:"50px",backgroundColor:"'#f8f9fa'"}}>
            <div className="container p-4 border rounded">
              <Team />
            </div>
          </div>

          <div className="col-sm-12" style={{backgroundColor:"'#f8f9fa'"}}>
            <div className="container p-4 border rounded">
              <Testimonial />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
