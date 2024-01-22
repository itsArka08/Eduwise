import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/AuthSlice';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

const initialValue = {
  name: '',
  email: '',
  mobile: '',
  password: '',
};

const Register = () => {
  const { redirectReg } = useSelector((state) => state?.Auth);
  const [user, setUser] = useState(initialValue);
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validation = () => {
    let error = {};

    if (!user.name) {
      error.name = 'Name is Required';
    }

    if (!user.email) {
      error.email = 'Email is Required';
    } else if (
      !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        user.email
      )
    ) {
      error.email = 'Enter a valid Email';
    }

    if (!user.mobile) {
      error.mobile = 'Mobile is Required';
    }
    if (!user.password) {
      error.password = 'Password is Required';
    }

    return error;
  };

  let name, value;
  const postUserData = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });

    setError({ ...error, [name]: '' });
  };

  const SubmitInfo = async (e) => {
    e.preventDefault();
    let ErrorList = validation();
    setError(validation());

    if (Object.keys(ErrorList).length === 0) {
      let formData = new FormData();
      formData.append('name', user.name);
      formData.append('email', user.email);
      formData.append('mobile', user.mobile);
      formData.append('password', user.password);
      dispatch(registerUser(formData));
    }
  };

  const redirectUser = () => {
    let name = localStorage.getItem('name');
    let isInRegisterPage = window.location.pathname.toLocaleLowerCase() === '/register';

    if (name !== null && name !== undefined && name !== '') {
      isInRegisterPage && navigate('/login');
    }
  };

  useEffect(() => {
    redirectUser();
  }, [redirectReg]);

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={7}>
          <Card>
            <Card.Header>
              <h4>Register</h4>
            </Card.Header>
            <Card.Body>
              <Form method="post" encType="multipart/form-data">
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={(e) => postUserData(e)}
                    isInvalid={!!error.name}
                  />
                  <Form.Control.Feedback type="invalid">{error.name}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={(e) => postUserData(e)}
                    isInvalid={!!error.email}
                  />
                  <Form.Control.Feedback type="invalid">{error.email}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control
                    type="text"
                    name="mobile"
                    value={user.mobile}
                    onChange={(e) => postUserData(e)}
                    isInvalid={!!error.mobile}
                  />
                  <Form.Control.Feedback type="invalid">{error.mobile}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={(e) => postUserData(e)}
                    isInvalid={!!error.password}
                  />
                  <Form.Control.Feedback type="invalid">{error.password}</Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={SubmitInfo}>
                  Register
                </Button>
              </Form>
              <p className="mt-3">
                Already have an account? <Link to="/login">Click Here!</Link>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
