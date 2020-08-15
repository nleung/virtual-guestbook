import React from 'react';
import Post from './Post';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import AddPostButton from './AddPostButton';
import './Gallery.css'

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      posts: []
    };
  }

  getPosts = () => {
    fetch('https://virtual-guestbook-service.herokuapp.com/api/posts/sammel')
      .then(res => res.json())
      .then(
        (data) => {
          this.setState({
            isLoaded: true,
            posts: data.posts,
            error: null
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  componentDidMount() {
    this.getPosts()
  }

  render() {
    const { error, isLoaded, posts } = this.state;

    const addPostButton = (
      <>
        <div className="Gallery-add-post-button">
          <AddPostButton onUpdate={this.getPosts} />
        </div>
      </>
    )

    if (error) {
      return <div>{addPostButton}Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>{addPostButton}Loading...</div>;
    } else {
      const elements = []
      var i;
      for (i = 0; i < posts.length; i += 3) {
        if (i === posts.length-1) {
          elements.push(
            <Row>
              <Col lg>
                <Post name={posts[i].name} comment={posts[i].comment} imageURL={posts[i].picture_url} />
              </Col>
              <Col lg/>
              <Col lg/>
            </Row>
          )
        } else if (i === posts.length-2) {
          elements.push(
            <Row>
              <Col lg>
                <Post name={posts[i].name} comment={posts[i].comment} imageURL={posts[i].picture_url} />
              </Col>
              <Col lg>
                <Post name={posts[i+1].name} comment={posts[i+1].comment} imageURL={posts[i+1].picture_url} />
              </Col>
              <Col lg/>
            </Row>
          )
        } else {
          elements.push(
            <Row>
              <Col lg>
                <Post name={posts[i].name} comment={posts[i].comment} imageURL={posts[i].picture_url} />
              </Col>
              <Col lg>
                <Post name={posts[i+1].name} comment={posts[i+1].comment} imageURL={posts[i+1].picture_url} />
              </Col>
              <Col lg>
                <Post name={posts[i+2].name} comment={posts[i+2].comment} imageURL={posts[i+2].picture_url} />
              </Col>
            </Row>
          )
        }
      }
      return (
        <div className="Gallery">
          {addPostButton}
          <Container>
            {elements}
          </Container>
        </div>
      );
    }
  }
}

export default Gallery
