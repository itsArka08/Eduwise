import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SearchInput from '../component/core/SearchInput';
import { LatestPost, fetchCategory } from '../redux/CategorySlice';
import { Link } from 'react-router-dom';

const Category = () => {
    const { category_data } = useSelector((state) => state?.categorySlice)
    const { letest_post_data } = useSelector((state) => state?.categorySlice)
    const dispatch=useDispatch()

    useEffect(() => {
        dispatch(fetchCategory());
        dispatch(LatestPost());
    }, [dispatch])
    return (
        <>
            <div className="sidebar" data-aos="fade-left">
                <h3 className="sidebar-title">Search</h3>
                <SearchInput />

                <h3 className="sidebar-title">Categories</h3>
                <div className="sidebar-item categories">
                    <ul>
                        {category_data !== null ? (
                            <>
                                {category_data?.data?.map((category, key) => {
                                    return (
                                        <>
                                            <li key={key}>
                                                <Link to={`/CategortWithBlog/${category?._id}`}>
                                                    {category.category}</Link></li>
                                        </>
                                    )
                                })}
                            </>
                        ) : (
                            <>
                                <span>Loading.......</span>
                            </>
                        )}
                    </ul>
                </div>

                <h3 className="sidebar-title">Recent Posts</h3>
                <div className="sidebar-item recent-posts">
                    {letest_post_data !== null ? (
                        <>
                            {letest_post_data?.data?.map((latest, key) => {
                                return (
                                    <>
                                        <div className="post-item clearfix" key={key}>
                                            <img src={`https://restapinodejs.onrender.com/api/blog/image/${latest._id}`} alt="" />
                                            <h4><a href="blog-single.html">{latest.title}</a></h4>
                                            <time dateTime="2020-01-01">{(new Date(latest.createdAt)).toLocaleDateString('en-us', { month: 'short', year: 'numeric' })}</time>
                                        </div>
                                    </>
                                )
                            })}
                        </>
                    ) : (
                        <span>Loading....</span>
                    )}

                </div>



            </div>
        </>
    )
}

export default Category