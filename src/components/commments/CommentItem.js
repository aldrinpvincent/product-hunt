import React from "react";

const CommentItem = props => {
  return (
    <li className="comment-wrapper">
      <div className="comment-image">
        <img alt={props.comment.username} src={props.comment.image_url} />
      </div>

      <div className="content-wrapper">
        <h3 className="content" itemProp="name">
          {props.comment.username}
        </h3>
        <p className="tag-line" itemProp="itemDescription">
          {props.comment.body}
        </p>
      </div>
    </li>
  );
};

export default CommentItem;
