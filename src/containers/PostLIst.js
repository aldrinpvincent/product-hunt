import React, { Component } from "react";
import PostItem from "./PostItem";
import { Row, Col } from "reactstrap";
import DatePicker from "react-date-picker";

import getPosts from "../api/posts";
import Favourites from "./Favourites";
import "./PostList.css";

class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
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
      this.setState({ posts: posts, loading: false });
    });
  }

  handleLike(id, isLiked) {
    let newLiked = this.state.liked.slice();
    if (isLiked) {
      newLiked.push(id);
    } else {
      var index = newLiked.indexOf(id);
      if (index > -1) {
        newLiked.splice(index, 1);
      }
    }
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
      let post = this.state.posts[id];
      post.id = id;
      return post;
    });
    this.setState({ likedPosts });
  }

  getLikedPosts() {
    return this.state.likedPosts;
  }

  handleDateChange = date => {
    this.setState({ loading: true });
    getPosts(date).then(posts => {
      this.setState({ posts: posts, startDate: date, loading: false });
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

    if (this.state.loading) {
      return <p>Loading posts...</p>;
    }

    return (
      <Row>
        <Col lg="8" md="8" sm="12" xs="12">
          <div className="date-pick">
            <span className="date-pick-text">View Posts of </span>
            <DatePicker
              maxDate={new Date()}
              value={this.state.startDate}
              onChange={this.handleDateChange}
            />
          </div>

          <ul className="posts-list">{postList}</ul>
        </Col>
        <Col lg="4" md="4" sm="12" xs="12">
          <p className="fav-label">Your Favourites</p>
          <ul className="posts-list">
            <Favourites
              likes={this.state.liked}
              likedPosts={this.state.likedPosts}
            />
          </ul>
        </Col>
      </Row>
    );
  }
}

export default PostList;
