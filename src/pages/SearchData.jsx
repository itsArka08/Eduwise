import React from 'react';
import { useSearch } from '../Contex/Search';
import Category from './Category';

const SearchData = () => {
  const [values, setValues] = useSearch();
  console.log(values);

  return (
    <div className="container">
      <div className="row">
        <div class="row g-0 text-center">
          <section id="blog" className="blog">
            <div className="container">
              <div className="row">
                <div class="col-sm-6 col-md-8">
                  {values?.results?.map((item, key) => {
                    return (
                      <>
                        <div className="col-md-12" key={item._id}>

                          <div className="card" style={{ width: '100%', marginBottom: '20px' }}>
                            <img
                              src={`https://restapinodejs.onrender.com/api/blog/image/${item._id}`}
                              style={{ width: '50%', height: '200px', objectFit: 'cover' }}
                              alt=""
                              className="card-img-top"
                            />
                            <div className="card-header"><h5>{item.title}</h5></div>
                            <div className="card-body">
                              <h5 className="card-title">
                                <h6
                                  dangerouslySetInnerHTML={{
                                    __html: item?.postText,
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
};

export default SearchData;
