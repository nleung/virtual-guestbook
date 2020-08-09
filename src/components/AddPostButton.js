import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BsPlusCircle } from "react-icons/bs";

import AddPostModal from './AddPostModal'
import './AddPostButton.css'

class AddPostButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      event_id: 'sammel',
      name: '',
      comment: ''
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSave = () => {
    const {event_id, name, comment} = this.state
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_id: event_id,
        name: name,
        comment: comment
      })
    };
    fetch('https://virtual-guestbook-service.herokuapp.com/api/posts/create', requestOptions)
      .then(response => response.json())
      .then(
        (data) => {
          this.setState({
            error: null
          });
          this.props.onUpdate()
        },
        (error) => {
          console.log(error)
          this.setState({
            error
          });
        }
      );

    this.setState({show: false});
  }

  render() {
    const handleClose = () => this.setState({show: false});
    const handleShow = () => this.setState({show: true});

    return (
      <>
        <Button variant="outline-primary" size="lg" onClick={handleShow}>
          <BsPlusCircle className="AddPostIcon" />&nbsp;&nbsp;Sign the Guestbook
        </Button>

        <Modal className="Modal-title" show={this.state.show} onHide={handleClose} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>Sign the Guestbook</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group as={Row} controlId="formName">
                <Form.Label column sm="2">Name</Form.Label>
                <Col sm="10">
                  <Form.Control type="name" name="name" placeholder="Enter name" onChange={this.onChange} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formPicture">
                <Form.Label column sm="2">Picture</Form.Label>
                <Col sm="10">
                  <Form.File type="picture" />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formComment">
                <Form.Label column sm="2">Comment</Form.Label>
                <Col sm="10">
                  <Form.Control as="textarea" name="comment" placeholder="Leave a comment" rows="3" onChange={this.onChange} />
                </Col>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="outline-success" onClick={this.handleSave}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default AddPostButton
