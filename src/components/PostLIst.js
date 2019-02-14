import React, { Component } from "react";
import PostItem from "./PostItem";
import { Row, Col } from "reactstrap";
import DatePicker from "react-date-picker";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Route, Switch } from "react-router-dom";

import "./PostList.css";
import getPosts from "../api/posts";
import Favourites from "./Favourites";

class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      startDate: new Date(),
      modal: false,
      modalId: 0,
      liked: [],
      likedPosts: []
    };
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.toggle = this.toggle.bind(this);

    this.updateLikedPosts = this.updateLikedPosts.bind(this);
    this.getLikedPosts = this.getLikedPosts.bind(this);
  }

  componentDidMount() {
    getPosts().then(posts => {
      this.setState({ posts: posts });
      this.props.updateState({ posts: posts });
    });
  }

  handleLike(id) {
    console.log("handleLike");
    let newLiked = this.state.liked.slice();
    newLiked.push(id);
    this.setState(
      {
        liked: newLiked
      },
      () => {
        this.updateLikedPosts();
      }
    );
  }

  updateLikedPosts() {
    let likedPosts = [];
    likedPosts = this.state.liked.map(id => {
      return this.state.posts[id];
    });
    this.setState({ likedPosts });
  }

  getLikedPosts() {
    return this.state.likedPosts;
  }

  handleDateChange = date => {
    console.log("date :", date);
    getPosts(date).then(posts => {
      this.setState({ posts: posts, startDate: date });
    });
  };

  toggle(e) {
    this.setState(prevState => ({
      modal: !prevState.modal,
      modalId: e.currentTarget.id
    }));
  }

  render() {
    let postList = [];
    const { posts } = this.state;
    for (const post in posts) {
      if (posts.hasOwnProperty(post)) {
        const element = posts[post];
        postList.push(
          <PostItem
            key={post}
            id={post}
            post={element}
            handleClick={this.toggle}
            handleLike={this.handleLike}
          />
        );
      }
    }

    // posts.forEach(post => {
    //   postList.push(
    //     <PostItem key={post.id} post={post} handleClick={this.toggle} />
    //   );
    // });

    postList = postList.length ? postList : <p>Loading posts...</p>;

    return (
      <>
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
          >
            <Favourites
              likes={this.state.liked}
              likedPosts={this.state.likedPosts}
            />
          </Col>
        </Row>
      </>
    );
  }
}

export default PostList;
