import Navbar from "./component/common/Navbar";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import { useDispatch } from "react-redux";
import About from './pages/About';
import Blog from './pages/Blog';
import { check_token } from './redux/AuthSlice';
import { useEffect } from "react";
import 'react-toastify/dist/ReactToastify.css'
import BlogDetails from './pages/BlogDetails';
import Footer from "./component/common/Footer";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Team from "./pages/Team";
import Testimonial from "./pages/Testimonial";
import Services from "./pages/Services";
import SearchData from "./pages/SearchData";
import CategoryWithBlog from "./pages/CategoryWithBlog";
import { ApplyCourse } from "./pages/ApplyCourse";

function App() {

  const dispatch = useDispatch();

  //token ache na nei check korbe jodi thake to page open hobe nhle login page e redirect korbe
  function PrivateRoute({ children }) {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    return token !== null && token !== undefined ? (
      children
    ) : (
      <Navigate to="/login" />
    );
  }

  const PrivateRouteNames = [
    {
      path: '/',
      Component: <Home />
    },
    {
      path: '/course',
      Component: <Courses />
    },
    {
      path: '/team',
      Component: <Team />
    },
    {
      path: '/testimonial',
      Component: <Testimonial />
    },
    {
      path: '/service',
      Component: <Services />
    },
    {
      path: '/search',
      Component: <SearchData />
    },
    {
      path: '/about',
      Component: <About />
    },
    {
      path: '/blog',
      Component: <Blog />
    },
    {
      path: '/blog-details/:id',
      Component: <BlogDetails />
    },
    
    {
      path: '/applycourse/:id',
      Component: <ApplyCourse/>
    },

  ]

  //for Public Route
  const PublicRouteNames = [
    {
      path: "/login",
      Component: <Login />
    },
    {

      path: "/register",
      Component: <Register />
    },
    {
      path: '/CategortWithBlog/:id',
      Component: <CategoryWithBlog />
    },
  ]

  //Jate jotobar e click kori j kono page without login user k login page e show kore
  useEffect(() => {
    dispatch(check_token())
  }, [])

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          {PublicRouteNames?.map((route, index) => {
            return (
              <Route
                Key={index + 1}
                path={route.path}
                element={route?.Component}
              />
            )
          })}

          {PrivateRouteNames?.map((route) => {
            return (
              <Route
                path={route.path}
                element={<PrivateRoute>{route?.Component}</PrivateRoute>}
              />
            )

          })}
        </Routes>
        <Footer />
      </Router>

    </>
  );
}

export default App;
