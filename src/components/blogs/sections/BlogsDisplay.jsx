import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import BlogDisplay from "./BlogDisplay";
import { Link } from "react-router-dom";
import "../index.css";

const BlogsDisplay = (props) => {
  const { allBlogs } = props;

  return (
    <>
      {allBlogs &&
        allBlogs.map((blog) => {
          return (
            <Link to={`/blogs/${blog.blogId}`} key={`blog${blog.blogId}`}>
              <BlogDisplay blog={blog} />
            </Link>
          );
        })}
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  const blogs = state.firestore.data.blogs;
  const allBlogs = [];

  if (blogs) {
    for (const blogId in blogs) {
      if (blogs[blogId].isApproved) {
        allBlogs.push(blogs[blogId]);
      }
    }
  }

  return {
    allBlogs,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "blogs" }])
)(BlogsDisplay);
