import React, { Component } from "react";
import Thumbnail from "./postItem/Thumbnail";
import Content from "./postItem/Content";

const CommentItem = props => {
  console.log("props :", props);
  return (
    <li style={{ width: "100%", border: "1px solid black" }}>
      <Thumbnail name={props.comment.username} src={props.comment.image_url} />

      <Content name={props.comment.username} tagline={props.comment.body} />
    </li>
  );
};

export default CommentItem;
