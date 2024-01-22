import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchBlog } from '../redux/BlogSlice';

import { Link } from 'react-router-dom';
import { Dna } from 'react-loader-spinner'
import Category from './Category';


const Blog = () => {
    const dispatch = useDispatch()
    const { blog_data } = useSelector((state) => state?.blog)
   
    const [visible, setVisible] = useState(4)

    useEffect(() => {
        dispatch(fetchBlog());
    }, [dispatch])

    const showmore = (() => {
        setVisible((prevValue) => prevValue + 4)
    })
    return (
        <div>
            <main id="main">
               
                <section id="blog" className="blog">
                    <div className="container">

                        <div className="row">

                            <div className="col-lg-8 entries">
                                {blog_data !== null ? (
                                    <>
                                        {blog_data?.data?.slice(0, visible).map((blog, key) => {
                                            return (
                                                <article className="entry" data-aos="fade-up" key={key}>

                                                    <div className="entry-img">
                                                        <img src={`https://restapinodejs.onrender.com/api/blog/image/${blog._id}`} style={{ height: "200px" }} alt="" className="img-fluid" />
                                                    </div>

                                                    <h2 className="entry-title">
                                                        <a href="blog-single.html">{blog.title}</a>
                                                    </h2>

                                                    <div className="entry-meta">
                                                        <ul>
                                                            <li className="d-flex align-items-center"><i className="icofont-user"></i> <a href="blog-single.html">Admin</a></li>
                                                            <li className="d-flex align-items-center"><i className="icofont-wall-clock"></i> <a href="blog-single.html"><time dateTime="2020-01-01">{(new Date(blog.createdAt)).toLocaleDateString()}</time></a></li>
                                                            <li className="d-flex align-items-center"><i className="icofont-comment"></i> <a href="blog-single.html">Comments</a></li>
                                                        </ul>
                                                    </div>


                                                    <div className="entry-content">
                                                        <p dangerouslySetInnerHTML={{
                                                            __html: blog?.postText.slice(0, 350)
                                                        }}>

                                                        </p>
                                                        <div className="read-more">
                                                            <Link to={`/blog-details/${blog?._id}`} style={{backgroundColor:"green"}}>Read More</Link>
                                                        </div>

                                                    </div>


                                                </article>
                                            )
                                        })}
                                        
                                        <center><button type="button" class="btn btn-info" onClick={showmore}>More</button></center>

                                    </>

                                ) : (
                                    <>
                                        <Dna
                                            visible={true}
                                            height="80"
                                            width="80"
                                            ariaLabel="dna-loading"
                                            wrapperStyle={{}}
                                            wrapperClass="dna-wrapper"
                                        />
                                    </>
                                )}
                                
                            </div>

                            <div className="col-lg-4">

                                <Category/>

                            </div>

                        </div>

                    </div>
                </section>

            </main>
        </div>
    )
}

export default Blog
