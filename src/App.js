import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

import "./App.css";
import PostList from "./components/PostLIst";

class App extends Component {
  render() {
    return (
      <Container fluid={false}>
        <header className="App-header">
          <h1>Product Hunt </h1>
        </header>
        <PostList />
      </Container>
    );
  }
}

export default App;
