import React, { Component } from "react";
import PostItem from "./PostItem";

const Favourites = props => {
  let posts = props.likedPosts;
  let postList = [];
  posts.forEach(post => {
    postList.push(<PostItem key={post.name} post={post} />);
  });
  return postList;
};

export default Favourites;
