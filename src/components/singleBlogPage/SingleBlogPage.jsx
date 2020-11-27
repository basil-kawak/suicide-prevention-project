import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Header } from "./sections/Header";
import { BlogHeader } from "./sections/BlogHeader";
import { BlogContent } from "./sections/BlogContent";
import Comments from "./sections/Comments";
import { Recommended } from "./sections/Recommended";
import Footer from "../common/Footer";
import { addComment, deleteComment } from "../../actions/blogActions";

const SingleBlogPage = (props) => {
  const { blog } = props;

  if (blog) {
    return (
      <div>
        <Header />
        <BlogHeader blog={blog} />
        <BlogContent blog={blog} />
        <Comments
          addComment={props.addComment}
          deleteComment={props.deleteComment}
          blog={blog}
        />
        <Recommended />
        <Footer />
      </div>
    );
  } else {
    return <h4>Loading...</h4>;
  }
};

const mapStateToProps = (state, ownProps) => {
  const blogId = ownProps.match.params.blogid;
  const blogs = state.firestore.data.blogs;
  const blog = blogs ? blogs[blogId] : null;
  const profiles = state.firestore.data.profiles;
  const profile = profiles ? profiles[state.firebase.auth.uid] : null;

  return {
    blog,
    auth: state.firebase.auth,
    blogId,
    profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addComment: (blogId, commentData) =>
      dispatch(addComment(blogId, commentData)),
    deleteComment: (blogId, userId) => dispatch(deleteComment(blogId, userId)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "blogs" }]),
  firestoreConnect([{ collection: "profiles" }])
)(SingleBlogPage);
