import React, { Component } from "react";
import Content from "../components/posts/Content";
import Thumbnail from "../components/posts/Thumbnail";
import LikeButton from "../components/posts/LikeButton";
import ItemModal from "./Comments";

class PostItem extends Component {
  constructor(props) {
    super(props);
    this.state = { modal: false, modalId: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
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
        url={this.props.post.url}
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
      <li className="post-item" id={this.props.id} onClick={this.handleClick}>
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

        <LikeButton id={this.props.id} handleLike={this.props.handleLike} />
      </li>
    );
  }
}

export default PostItem;
