import React from 'react';

import './Comment.css'

const LENGTH_THRESHOLD = 200

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  };

  showMore = (e) => {
    e.preventDefault();
    this.setState({
      expanded: true
    });
  }

  showLess = (e) => {
    e.preventDefault();
    this.setState({
      expanded: false
    });
  }

  render() {
    let comment;
    if (!this.props.text) {
      comment = ''
    } else if (this.props.text.length < LENGTH_THRESHOLD) {
      comment = this.props.text;
    } else {
      if (this.state.expanded) {
        comment = (
          <div>
            {this.props.text + " "}<a href="#" onClick={this.showLess}>less</a>
          </div>
        );
      } else {
        comment = (
          <div>
            {this.props.text.substring(0, LENGTH_THRESHOLD) + "... "}<a href="#" onClick={this.showMore}>more</a>
          </div>
        );
      }
    }
    return (<div className="Post-comment">{comment}</div>);
  }
}

export default Comment
