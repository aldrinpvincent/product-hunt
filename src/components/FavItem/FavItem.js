import React, { Component } from "react";
import Content from "../posts/Content";
import Thumbnail from "../posts/Thumbnail";
import ItemModal from "../../containers/Comments";

class FavItem extends Component {
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

        <div className="fav-thumbnail">
          <img alt={this.props.post.name} src={this.props.post.image_url} />
        </div>

        <div className="content-wrapper">
          <h3 className="content" itemProp="name">
            {this.props.post.name}
          </h3>

          <span className="meta_info">{this.props.post.catogory}</span>
        </div>
      </li>
    );
  }
}

export default FavItem;
