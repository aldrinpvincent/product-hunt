import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { Route, Switch } from "react-router-dom";

import "./App.css";
import PostList from "./components/PostLIst";
import Nav from "./components/Nav";
import Favourites from "./components/Favourites";

class App extends Component {
  constructor() {
    super();
    this.state = { posts: {}, liked: [], likedPosts: [] };
    this.updateState = this.updateState.bind(this);
    this.updateLikedPosts = this.updateLikedPosts.bind(this);
    this.getLikedPosts = this.getLikedPosts.bind(this);
  }

  updateState(newState) {
    // console.log("this.state.posts :", this.state.posts);

    this.setState(newState, () => {
      this.updateLikedPosts();
    });
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

  render() {
    return (
      <Container fluid={false}>
        <header className="App-header">
          <h1>Product Hunt </h1>
        </header>
        {/* <Nav /> */}
        <Switch>
          <Route
            exact
            path="/"
            render={_ => <PostList updateState={this.updateState} />}
          />
          <Route
            exact
            path="/likes"
            render={_ => (
              <Favourites
                likes={this.state.liked}
                getLikedPosts={this.getLikedPosts}
              />
            )}
          />
        </Switch>
      </Container>
    );
  }
}

export default App;

const Hi = () => {
  return <p>hi</p>;
};
