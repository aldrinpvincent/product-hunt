import React, { Component } from "react";
import { Container } from "reactstrap";

import "./App.css";
import PostList from "./containers/PostLIst";

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <>
        <div className="App-header">
          <header>
            <h2>Product Hunt </h2>
          </header>

          <p>The best new products in TEch</p>
        </div>

        <Container fluid={false}>
          <PostList />
        </Container>
      </>
    );
  }
}

export default App;
