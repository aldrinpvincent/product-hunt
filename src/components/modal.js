import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import CommentItem from "./CommentItem";
import getComments from "../api/comments";

class ItemModal extends Component {
  constructor(props) {
    super(props);
    this.state = { comments: [], commentCount: 5 };
    this.loadMoreComments = this.loadMoreComments.bind(this);
  }

  componentDidMount() {
    getComments(this.props.modalId).then(comments => {
      // console.log("comments :", comments);
      this.setState({ comments: comments });
    });
  }

  loadMoreComments(prevState) {
    this.setState({ commentCount: prevState.commentCount + 5 });
  }

  render() {
    let commentList = [];
    const { comments } = this.state;

    const commentCount =
      this.state.commentCount < comments.length
        ? this.state.commentCount
        : comments.length;

    for (let i = 0; i < commentCount; i++) {
      const comment = comments[i];
      commentList.push(<CommentItem key={comment.id} comment={comment} />);
    }
    // comments.forEach(comment => {
    //   commentList.push(<CommentItem key={comment.id} comment={comment} />);
    // });
    commentList = commentList.length ? commentList : <p>Loading comments...</p>;
    return (
      <Modal
        isOpen={this.props.show}
        toggle={this.props.toggle}
        className={this.props.className}
        autoFocus={true}
        size="lg"
      >
        {this.props.children}
        <div className="comments">
          <p>Comments</p>
          {<ul> {commentList}</ul>}
          <div>
            <button style={{ float: "left" }} onClick={this.loadMoreComments}>
              Load more....
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}

export default ItemModal;
