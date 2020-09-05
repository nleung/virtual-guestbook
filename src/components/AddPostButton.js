import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProgressBar from 'react-bootstrap/ProgressBar'
import { BsPlusCircle } from "react-icons/bs";
import Resizer from 'react-image-file-resizer';

import './AddPostButton.css'
import {createPost, getSignedUrl} from '../clients/Guestbook.js'

class AddPostButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      event_id: 'sammel',
      name: '',
      picture_url: '',
      comment: '',
      file: null,
      file_state: ''
    };
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onError = (error) => {
    console.log(error)
    this.setState({
      error
    });
  };

  onGetSignedUrlSuccess = (signedUrl, objectUrl) => {
    const {file, file_name} = this.state

    const formData = new FormData()
    formData.append('file', file)
    formData.append('key', file_name)

    const requestOptions = {
      method: 'PUT',
      body: this.state.file
    };

    fetch(signedUrl, requestOptions)
      .then(
        (result) => {
          if (this.state.show) {
            this.setState({
              "picture_url": objectUrl,
              "file_state": "UPLOADED"
            });
          }
        },
        (error) => {
          console.log("upload error is " + error);
        }
      );
  };

  onPictureChange = (e) => {
    this.setState({"file_state": "UPLOADING"})

    const file = e.target.files[0]
    const file_parts = e.target.value.split('\\');
    const file_name = Date.now() + "-" + file_parts[file_parts.length - 1];

    Resizer.imageFileResizer(
        file,
        1000,
        1000,
        'JPEG',
        100,
        0,
        uri => {
          const resizedFile = this.dataURLtoFile(uri, file_name)
          this.setState({
            "file": resizedFile,
            "file_name": file_name
          })

          getSignedUrl(file_name, "image/jpeg", this.onGetSignedUrlSuccess, this.onError);
        },
        'base64'
    );
  };

  dataURLtoFile = (dataurl, filename) => {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
  };

  handleSave = () => {
    const {event_id, name, picture_url, comment} = this.state
    createPost(event_id, name, picture_url, comment,
      (data) => {
        this.setState({
          error: null
        });
        this.props.onUpdate();
      },
      (error) => {
        console.log(error)
        this.setState({
          error
        });
      }
    );
    this.setState({
      show: false,
      file_state: undefined
    });
  }

  handleClose = () => {
    this.setState({
      show: false,
      file_state: undefined
    });
  }

  handleShow = () => {
    this.setState({show: true});
  }

  render() {
    let imagePreview;
    if (this.state.file_state === "UPLOADING") {
      imagePreview = (
        <Row>
          <Col sm="2"/>
          <Col sm="10"  className="Image-preview">
            Uploading...
            <ProgressBar animated now={100} variant="success"/>
          </Col>
        </Row>
      );
    } else if (this.state.file_state === "UPLOADED") {
      imagePreview = (
        <Row>
          <Col sm="2"/>
          <Col sm="10" className="Image-preview">
            <img className="img-fluid w-100" src={this.state.picture_url} alt="Preview" />
          </Col>
        </Row>
      );
    }

    let saveButton;
    if (this.state.file_state === "UPLOADING") {
      saveButton = (
        <Button variant="outline-success" onClick={this.handleSave} disabled>
          Save
        </Button>
      )
    } else {
      saveButton = (
        <Button variant="outline-success" onClick={this.handleSave}>
          Save
        </Button>
      )
    }

    return (
      <>
        <Button variant="outline-primary" size="lg" onClick={this.handleShow}>
          <BsPlusCircle className="AddPostIcon" />&nbsp;&nbsp;Sign the Guestbook
        </Button>

        <Modal className="Modal-title" show={this.state.show} onHide={this.handleClose} backdrop="static" keyboard={false}>
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
                <Form.Label column sm="2">Picture of your family watching the wedding</Form.Label>
                <Col sm="10">
                  <Form.File type="picture_file" onChange={this.onPictureChange}/>
                </Col>
              </Form.Group>
              {imagePreview}
              <Form.Group as={Row} controlId="formComment">
                <Form.Label column sm="2">Comment</Form.Label>
                <Col sm="10">
                  <Form.Control as="textarea" name="comment" placeholder="Leave a comment" rows="3" onChange={this.onChange} />
                </Col>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={this.handleClose}>
              Cancel
            </Button>
            {saveButton}
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default AddPostButton
