import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useSearch } from '../../Contex/Search';




const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/search/${values.keyword}`);
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="sidebar-item search-form">
        <form onSubmit={handleSubmit}>
          <input
            className="form-control"
            type="text"
            placeholder="Search"
            aria-label="Search"
            value={values.keyword}
            onChange={(e) => setValues({ ...values, keyword: e.target.value })}
          />
          <button type="submit"><i className="icofont-search"></i></button>
        </form>
      </div>
    </div>
  )
}

export default SearchInput