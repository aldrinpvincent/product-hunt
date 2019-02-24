import React, { Component } from "react";
import { Modal } from "reactstrap";
import CommentItem from "../components/comments/CommentItem";
import getComments from "../api/comments";

class ItemModal extends Component {
  constructor(props) {
    super(props);
    this.state = { comments: [], commentCount: 5 };
    this.loadMoreComments = this.loadMoreComments.bind(this);
  }

  componentDidMount() {
    getComments(this.props.modalId).then(comments => {
      this.setState({ comments: comments });
    });
  }

  loadMoreComments() {
    let currentCount = this.state.commentCount;
    this.setState({ commentCount: currentCount + 5 });
  }

  render() {
    let commentList = [];
    const { comments } = this.state;

    const loadMore = this.state.commentCount < comments.length ? true : false;
    const commentCount =
      this.state.commentCount < comments.length
        ? this.state.commentCount
        : comments.length;

    for (let i = 0; i < commentCount; i++) {
      const comment = comments[i];
      commentList.push(<CommentItem key={comment.id} comment={comment} />);
    }
    commentList = commentList.length ? (
      commentList
    ) : (
      <p className="left full-width">Loading comments...</p>
    );

    const loadButton = loadMore ? (
      <div>
        <button
          className="btn btn-info load-button"
          onClick={this.loadMoreComments}
        >
          Load more comments...
        </button>
      </div>
    ) : null;

    return (
      <Modal
        isOpen={this.props.show}
        toggle={this.props.toggle}
        autoFocus={true}
        size="lg"
      >
        {this.props.children}
        <div className="comments">
          <p className="comments-label">COMMENTS</p>`
          <a
            className="right"
            href={this.props.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit Product Page &rarr;
          </a>
          {<ul> {commentList}</ul>}
        </div>
        {loadButton}
      </Modal>
    );
  }
}

export default ItemModal;
