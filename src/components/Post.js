import React from 'react';
import './Post.css';

class Post extends React.Component {
  render() {
    let image;
    if (this.props.imageURL) {
      image = (
        <img className="img-fluid w-100" src={this.props.imageURL} alt="Post" />
      );
    } else if (this.props.comment){
      image = (<hr/>)
    }

    return (
      <div className="Post">
        <div className="Post-header">{this.props.name}</div>
        {image}
        <div className="Post-comment">{this.props.comment}</div>
      </div>
    );
  }
}

export default Post
