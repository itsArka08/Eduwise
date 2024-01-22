import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { categoryWithBlog } from '../redux/CategoryWithBlogSlice'
import Category from './Category'

const CategoryWithBlog = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { categoryBlog } = useSelector((state) => state.Catwiseblog)
  useEffect(() => {
    dispatch(categoryWithBlog(id))
  }, [dispatch, id])

  console.log(categoryBlog);
  return (
    <>

      <div>
        <main id="main">

          <section id="blog" className="blog">
            <div className="container">

              <div className="row">

                <div className="col-lg-8 entries">
                  <div className="container">
                    <div className="row">
                      {categoryBlog?.map((item, key) => {
                        return (
                          <>
                            <div className="col-md-10" key={item._id}>
                              <div className="card" style={{ width: '100%', marginBottom: '20px' }}>
                                <img
                                  src={`https://restapinodejs.onrender.com/api/blog/image/${item._id}`}
                                  style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                                  alt=""
                                  className="card-img-top"
                                />
                                <div className="card-header"><h3>{item.title}</h3></div>
                                <div className="card-body">
                                  <h5 className="card-title">
                                    <h6
                                      dangerouslySetInnerHTML={{
                                        __html: item?.postText.slice(0,500),
                                      }}
                                    ></h6>
                                  </h5>
                                </div>
                              </div>
                            </div>
                          </>
                        )
                      }

                      )}
                    </div>
                  </div>

                </div>

                <div className="col-lg-4">

                  <Category />

                </div>

              </div>

            </div>
          </section>

        </main>
      </div>

    </>
  )
}

export default CategoryWithBlog