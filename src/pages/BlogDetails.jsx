import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { BlogDetailspart } from '../redux/BlogDetailsSlice'
import { useEffect } from 'react'
import { fetchCommentData } from '../redux/CommentSlice'
import Category from './Category'
import CommentForm from './CommentPost'
import axiosInstance from '../Api/apiUrl'
import { toast } from 'react-toastify'
const BlogDetails = () => {
    const { blog_details } = useSelector((state) => state?.detailBlog)
    const { comment_data } = useSelector((state) => state?.Comment)
    console.log(blog_details.data?.postText, 'blog_details')
    const { id } = useParams()
    const dispatch = useDispatch()
    const [load, setLoad] = useState(5);

    const looder = () => {
        setLoad(load + 5)
    }

    useEffect(() => {
        dispatch(BlogDetailspart(id));
        dispatch(fetchCommentData(id));
    }, [dispatch, id])

    console.log("Comments", comment_data);

    const [like, setlike] = useState(true);
    const [loadbtn, setloadbtn] = useState(false)
    const likework = async () => {
        try {
            const likedata = await axiosInstance.put(`blog/like/${id}`);
            if (likedata.data) {
                setlike(false);
                setloadbtn(true);
                toast.success("You Liked");
                dispatch(BlogDetailspart(id));
                const savedData = JSON.parse(localStorage.getItem("likedData")) || {};
                savedData[id] = true;
                localStorage.setItem("likedData", JSON.stringify(savedData));
            } else {
                setlike(false);
                setloadbtn(false);
                const savedData = JSON.parse(localStorage.getItem("likedData")) || {};
                savedData[id] = false;
                localStorage.setItem("likedData", JSON.stringify(savedData));
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const likedData = JSON.parse(localStorage.getItem("likedData")) || {};
    const isLiked = likedData[id] === true;
    return (

        <div className="container">

            <div className="row">

                <div className="col-lg-12 entries">
                    <div class="row g-0 text-center">
                        <div class="col-sm-6 col-md-12"><main id="main">
                            <section id="blog" className="blog">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-8 entries">

                                            <article className="entry" data-aos="fade-up" >
                                                <h2 className="entry-title">
                                                    <a href="blog-single.html">{blog_details.data?.title}</a>
                                                </h2>
                                                <li className="d-flex align-items-center"><i className="icofont-wall-clock"></i> <a href="blog-single.html"><time dateTime="2020-01-01">{(new Date(blog_details.data?.createdAt)).toLocaleDateString()}</time></a></li>
                                                <div className="entry-content">
                                                    <p dangerouslySetInnerHTML={{
                                                        __html: blog_details.data?.postText
                                                    }}></p>
                                                </div>
                                                {
                                                    isLiked ? (
                                                        <>
                                                            <button style={{marginRight:"550px"}} className='btn btn-success' disabled>Liked {blog_details?.data?.likes}</button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <button style={{marginRight:"550px"}} className='btn btn-primary' onClick={likework} disabled={loadbtn}>
                                                                {loadbtn ? "Wait..." : <>Like Now</>}
                                                            </button>
                                                        </>
                                                    )
                                                }
                                                <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                                                    <div>
                                                        Like: {blog_details?.data?.likes}
                                                    </div>
                                                    <div>
                                                        DisLike: {blog_details?.data?.unlikes}
                                                    </div>
                                                </div>

                                            </article>
                                        </div>

                                        <div className="col-lg-4">

                                            <Category />

                                            <CommentForm />

                                        </div>

                                        <div className="col-sm-6 col-md-8" style={{ borderColor: "black" }}>
                                            <div className='container'>
                                                <h1>Comments</h1>
                                                {
                                                    comment_data?.comments?.slice(0, load)?.map((item, key) => (
                                                        <div key={key} className="card" style={{ marginBottom: '20px' }}>
                                                            <div className="card-body">
                                                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                                                    <h5 className="card-title" style={{ fontWeight: 'bold' }}>{item?.name}:</h5>
                                                                    {/* You can add styling for the timestamp if needed */}
                                                                </div>
                                                                <p className="card-text" style={{ marginBottom: '0' }}>{item?.comment}</p>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>



                        </main></div>

                    </div>
                </div>


            </div>
        </div>
    )
}

export default BlogDetails
