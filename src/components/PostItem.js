import React, { Component } from "react";
import Content from "./postItem/Content";
import Thumbnail from "./postItem/Thumbnail";
import LikeButton from "./postItem/LikeButton";
import ItemModal from "./modal";

class PostItem extends Component {
  constructor(props) {
    super(props);
    this.state = { modal: false, modalId: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    // console.log("click :");
    // console.log("e.target.ParentElement.id :", e.target.parentElement.id);
    let id = e.currentTarget.id;
    e.stopPropagation();
    e.preventDefault();
    this.setState(prevState => ({
      modal: !prevState.modal,
      modalId: id
    }));
  }

  render() {
    const modal = this.state.modal ? (
      <ItemModal
        toggle={this.handleClick}
        show={this.state.modal}
        modalId={this.state.modalId}
      >
        <Thumbnail
          name={this.props.post.name}
          src={this.props.post.image_url}
        />

        <Content
          name={this.props.post.name}
          tagline={this.props.post.tagline}
          catogory={this.props.post.catogory}
        />
      </ItemModal>
    ) : null;
    return (
      <li
        className="post-item"
        id={this.props.post.id}
        onClick={this.handleClick}
      >
        {modal}

        <Thumbnail
          name={this.props.post.name}
          src={this.props.post.image_url}
        />

        <Content
          name={this.props.post.name}
          tagline={this.props.post.tagline}
          catogory={this.props.post.catogory}
        />

        <LikeButton id={this.props.post.id} />
      </li>
    );
  }
}

export default PostItem;
