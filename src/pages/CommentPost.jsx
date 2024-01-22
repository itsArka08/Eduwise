

import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axiosInstance from '../Api/apiUrl';

const CommentPost = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const { id } = useParams();

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post(`blog/${id}/comment/create`, data);

      if (response.data.success) {
        toast.success(response.data.message);
        setValue('name', '');
        setValue('email', '');
        setValue('comment', '');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <Container className="mt-4">
        <h6 className="fw-bold mb-4">Add a Comment</h6>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className="mb-3">
            <Col>
              <Form.Control
                type="text"
                placeholder="Your Name"
                {...register('name', { required: true })}
              />
              {errors.name && <p style={{ color: 'red' }}>Name is required</p>}
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Control
                type="email"
                placeholder="Your Email"
                {...register('email', { required: true })}
              />
              {errors.email && <p style={{ color: 'red' }}>Email is required</p>}
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Your Comment"
                {...register('comment', { required: true })}
              />
              {errors.comment && <p style={{ color: 'red' }}>Comment is required</p>}
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Button type="submit" variant="primary" className="w-100">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  )
}

export default CommentPost