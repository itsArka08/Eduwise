import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RegLog, loginRequest } from '../redux/AuthSlice';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

const initialValue = {
  email: '',
  password: '',
};

const Login = () => {
  const [user, setUser] = useState(initialValue);
  const { redirectTo } = useSelector((state) => state?.Auth);
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const dispatch = useDispatch();

  // Form validation
  const validation = () => {
    let error = {};
    if (!user.email) {
      error.email = 'Email is Required';
    } else if (
      !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        user.email
      )
    ) {
      error.email = 'Enter a valid Email';
    }
    if (!user.password) {
      error.password = 'Password is Required';
    }
    return error;
  };

  // Onchange validation
  let name, value;
  const postUserData = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
    setError({ ...error, [name]: '' });
  };

  const submitInfo = (e) => {
    e.preventDefault();
    let errorList = validation();
    setError(errorList);
    let data = {
      email: user.email,
      password: user.password,
    };
    dispatch(loginRequest(data));
  };

  // Redirect if get the token or not get the token
  const redirectUser = () => {
    let token = localStorage.getItem('token');
    let isInLoginPage = window.location.pathname.toLowerCase() === '/login';

    if (token !== null && token !== undefined && token !== '') {
      isInLoginPage && navigate('/');
    }
  };

  useEffect(() => {
    redirectUser();
  }, [redirectTo]);

  const log = () => {
    dispatch(RegLog());
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={7}>
          <Card>
            <Card.Header>
              <h4>Login</h4>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    onChange={(e) => postUserData(e)}
                    isInvalid={!!error.email}
                  />
                  <Form.Control.Feedback type="invalid">{error.email}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    onChange={(e) => postUserData(e)}
                    isInvalid={!!error.password}
                  />
                  <Form.Control.Feedback type="invalid">{error.password}</Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={submitInfo}>
                  Login
                </Button>
              </Form>
              <p className="mt-3">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
