import React, { Component } from "react";

class LikeButton extends Component {
  constructor() {
    super();
    this.state = {
      liked: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    console.log("e :", e.target.id);
    e.stopPropagation();
    this.setState({
      liked: !this.state.liked
    });
    this.props.handleLike(e.target.id);
  }

  render() {
    const label = this.state.liked ? "Unlike" : "Like";
    return (
      <div className="like-button">
        <button
          id={this.props.id}
          className="btn btn-primary"
          onClick={this.handleClick}
        >
          {label}
        </button>
      </div>
    );
  }
}

export default LikeButton;
