import React from 'react';
import './Post.css';

class Post extends React.Component {
  render() {
    const postElements = [];
    if (this.props.name) {
      postElements.push(<div className="Post-header">{this.props.name}</div>);
    }
    if (this.props.imageURL) {
      postElements.push(<img className="img-fluid w-100" src={this.props.imageURL} alt="Post" />);
    } else {
      postElements.push(<hr/>)
    }
    if (this.props.comment) {
      postElements.push(<div className="Post-comment">{this.props.comment}</div>)
    }

    return (
      <div className="Post">
        {postElements}
      </div>
    );
  }
}

export default Post
