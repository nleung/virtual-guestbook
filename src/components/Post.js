import React from 'react';

import Comment from './Comment.js'
import './Post.css';

class Post extends React.Component {
  render() {
    let image;
    if (this.props.imageURL) {
      image = (
        <img className="img-fluid w-100" src={this.props.imageURL} alt="Post" />
      );
    }

    return (
      <div className="Post">
        <div className="Post-header">{this.props.name}</div>
        {image}
        <Comment text={this.props.comment} />
      </div>
    );
  }
}

export default Post
