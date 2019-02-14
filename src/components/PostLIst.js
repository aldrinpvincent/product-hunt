import React, { Component } from "react";
import PostItem from "./PostItem";
import { Row, Col } from "reactstrap";
import DatePicker from "react-date-picker";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import "./PostList.css";
import getPosts from "../api/posts";
import ItemModal from "./modal";
import Thumbnail from "./postItem/Thumbnail";
import Content from "./postItem/Content";

class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: [], startDate: new Date(), modal: false, modalId: 0 };
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    getPosts().then(posts => {
      this.setState({ posts: posts });
    });
  }

  handleDateChange = date => {
    console.log("date :", date);
    getPosts(date).then(posts => {
      this.setState({ posts: posts, startDate: new Date() });
    });
  };

  handleClick(e) {
    console.log("e :", e.currentTarget.id);
  }

  toggle(e) {
    this.setState(prevState => ({
      modal: !prevState.modal,
      modalId: e.currentTarget.id
    }));
  }

  render() {
    let postList = [];
    const { posts } = this.state;
    posts.forEach(post => {
      postList.push(
        <PostItem key={post.id} post={post} handleClick={this.toggle} />
      );
    });

    postList = postList.length ? postList : <p>Loading posts...</p>;

    return (
      <Row>
        <Col lg="8" md="8" sm="12" xs="12">
          <p>View Posts of</p>
          <DatePicker
            maxDate={new Date()}
            value={this.state.startDate}
            onChange={this.handleDateChange}
          />
          <ul className="posts-list">{postList}</ul>
        </Col>
        <Col
          lg={{ size: "3", offset: 1 }}
          md={{ size: "3", offset: 1 }}
          sm="12"
          xs="12"
        />
      </Row>
    );
  }
}

export default PostList;
