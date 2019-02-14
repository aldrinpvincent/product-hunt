import React from "react";
import FavItem from "../components/favourites/FavItem";

const Favourites = props => {
  let posts = props.likedPosts;
  let postList = [];
  posts.forEach(post => {
    postList.push(<FavItem key={post.id} post={post} />);
  });
  return postList;
};

export default Favourites;
