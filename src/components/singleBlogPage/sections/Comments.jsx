import React, { useState } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import "../index.css";
import { Row, Col, Container, Button, Image } from "react-bootstrap";
const Comments = (props) => {
  const { blog, auth, profile } = props;
  const [comment, setComment] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    const commentData = {
      userId: auth.uid,
      date: new Date().toLocaleString(),
      dispayName: profile.fullName || "",
      profilePhoto: profile.imageURL,
      comment,
    };
    props.addComment(blog.blogId, commentData);
    setComment("");
  };
  let allComments = [];
  if (blog) {
    allComments =
      blog.comments &&
      blog.comments.map((item) => {
        const profilePhoto =
          item.profilePhoto ||
          "https://i.ibb.co/k0NNyLV/User-profile-image.png";
        return (
          <div className="border-bottom">
            <Image
              className="visitorImage"
              src={profilePhoto}
              alt="Visitor profile"
              width="70"
              height="70"
              thumbnail
            />
            <div className="displayedComment">
              <p className="visitorName">
                <h6 className="commentedPerson">{item.dispayName}</h6>
                <p className="ml-3 visitorComment">{item.comment}</p>
                <p className="ml-3 commentDate">{item.date}</p>
              </p>
            </div>
            {auth.uid === item.userId && (
              <Button
                variant="danger"
                size="sm"
                className="ml-3 commentDeleteBtn"
                onClick={() => props.deleteComment(blog.blogId, item)}
              >
                Remove
              </Button>
            )}
          </div>
        );
      });
  } else {
    return <h4>Loading...</h4>;
  }
  if (profile) {
    return (
      <Container className="w-100 addingCommentSection">
        <Row>
          <Col xs={10} md={10} lg={10} className="commentSection">
            <p className="commentsTitle">Comments</p>
            <section className="">{allComments}</section>
            <form className="replyFields" onSubmit={handleSubmit}>
              <h5>Leave a comment</h5>
              <h6>Only users can post a comment</h6>
              <textarea
                onChange={(e) => setComment(e.target.value)}
                value={comment}
                placeholder="Write your comment"
                cols="80"
                rows="2"
                className="col-lg-12 col-md-10 col-sm-10 infoFields mb-0"
                maxlength="50"
              ></textarea>
              <Button
                className="w-25 commentButton"
                type="submit"
                disabled={!auth || profile.isBlocked}
              >
                Post
              </Button>
            </form>
          </Col>
        </Row>
      </Container>
    );
  } else {
    return (
      <Container>
        <h4>Loading...</h4>
      </Container>
    );
  }
};
const mapStateToProps = (state, ownProps) => {
  const auth = state.firebase.auth;
  const profiles = state.firestore.data.profiles;
  const profile = profiles ? profiles[auth.uid] : null;
  return {
    profile,
    auth,
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "profiles" }])
)(Comments);
