import React from 'react';
import './Post.css';

class Post extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Post">
        <div className="Post-header">{this.props.name}</div>
        <img
          class="img-fluid w-100"
          src={this.props.imageURL}
          alt="Leung family"
          height="300"
          width="300"
        />
        <div className="Post-comment">{this.props.comment}</div>
      </div>
    );
  }
}

export default Post
