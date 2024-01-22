import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourseData } from '../redux/CourseSlice';
import { Link } from 'react-router-dom';
import Category from './Category';

function Courses() {
  const dispatch = useDispatch();
  const { course_data } = useSelector((state) => state.course);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const containerStyle = {
    maxWidth: '1000px',
    margin: '0 auto',
  };

  const getCardStyle = (index) => {
    const baseStyle = {
      marginBottom: '20px',
      marginTop: '20px',
      boxShadow: '0 6px 8px rgba(0.1, 0.1, 0.1, 0.1)',
      transition: 'transform 0.6s ease-in-out',
      position: 'relative',
      transform: index === hoveredIndex ? 'scale(1.05)' : 'scale(1)',
    };

    const hoverStyle = {
      background: index === hoveredIndex ? 'pink' : 'white', // Change the colors as needed
      color: 'white',
    };

    return { ...baseStyle, ...hoverStyle };
  };

  const cardImageStyle = {
    height: '150px',
    objectFit: 'cover',
  };

  const cardBodyStyle = {
    position: 'relative',
    zIndex: 1,
  };

  const cardTitleStyle = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
  };

  const cardTextStyle = {
    fontSize: '0.9rem',
  };

  useEffect(() => {
    dispatch(fetchCourseData());
  }, [dispatch]);

  return (
    <div className="container">
      <div className="row">
        <div class="row g-0 text-center">
          <section id="blog" className="blog">
            <div className="container">
              <div className="row">
                <div class="col-sm-6 col-md-8">
                  <div style={containerStyle}>
                    <center><h1>Our Courses</h1></center>
                    <div className="row">

                      {course_data?.map((item, key) => (
                        <div
                          key={key}
                          className="col-sm-6 col-md-4 col-lg-4 mb-3"
                          onMouseOver={() => setHoveredIndex(key)}
                          onMouseOut={() => setHoveredIndex(null)}
                        >
                          <div className="card course-card" style={getCardStyle(key)}>
                            <img
                              src={`https://restapinodejs.onrender.com/api/course/photo/${item?._id}`}
                              className="card-img-top"
                              alt={item.title}
                              style={cardImageStyle}
                            />
                            <div className="card-body" style={cardBodyStyle}>
                              <h5 className="card-title" style={cardTitleStyle}>
                                {item.title}
                              </h5>
                              <p className="card-text" style={cardTextStyle}>
                                {item.description}
                              </p>
                              <Link to={`/applycourse/${item._id}`} style={{ textDecoration: 'none' }}>
                                <center>
                                  <button type="button" className="btn btn-primary">
                                    Apply
                                  </button>
                                </center>
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">

                  <Category />

                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Courses;
