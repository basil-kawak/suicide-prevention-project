import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Button, ListGroup } from "react-bootstrap";
import BlogEditor from "../BlogEditor/BlogEditor";
import BlogBox from "./BlogBox";
import {
  approveBlog,
  deleteBlogFromStorage,
  deleteBlogFromDB,
} from "../../actions/blogActions";
import { ADMIN_ROLE, AUTHOR_ROLE } from "../../components/common/roleConstants";

const ManageBlogs = (props) => {
  const { allBlogs, currentUserBlogs, profile } = props;
  const [newBlog, setNewBlog] = React.useState(null);
  const closeBlogEditor = () => {
    setNewBlog(null);
  };
  if (allBlogs && profile) {
    return (
      <ListGroup defaultActiveKey="none">
        {profile.userType === AUTHOR_ROLE && (
          <Button
            variant="success"
            className="mb-5"
            onClick={() =>
              setNewBlog(
                <BlogEditor
                  closeBlogEditor={closeBlogEditor}
                  profile={profile}
                />
              )
            }
          >
            Add a new blog
          </Button>
        )}
        {newBlog}
        {profile.userType === AUTHOR_ROLE &&
          !newBlog &&
          currentUserBlogs.map((blog) => {
            return (
              <ListGroup.Item>
                <BlogBox
                  approveBlog={props.approveBlog}
                  blog={blog}
                  userType={profile.userType}
                />
              </ListGroup.Item>
            );
          })}
        {profile.userType === ADMIN_ROLE &&
          !newBlog &&
          allBlogs.map((blog) => {
            return (
              <ListGroup.Item>
                <BlogBox
                  approveBlog={props.approveBlog}
                  deleteBlogFromStorage={props.deleteBlogFromStorage}
                  deleteBlogFromDB={props.deleteBlogFromDB}
                  blog={blog}
                  userType={profile.userType}
                />
              </ListGroup.Item>
            );
          })}
      </ListGroup>
    );
  } else {
    return <h4>Loading...</h4>;
  }
};
const mapStateToProps = (state, ownProps) => {
  const { userId } = ownProps;
  const blogs = state.firestore.data.blogs;
  const profiles = state.firestore.data.profiles;
  const profile = profiles ? profiles[state.firebase.auth.uid] : null;
  const allBlogs = [];
  const currentUserBlogs = [];
  if (blogs) {
    for (const blogId in blogs) {
      if (blogs[blogId].userId === state.firebase.auth.uid) {
        currentUserBlogs.push(blogs[blogId]);
      }
      allBlogs.push(blogs[blogId]);
    }
  }
  return {
    currentUserBlogs,
    allBlogs,
    auth: state.firebase.auth,
    userId,
    profile,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    approveBlog: (blogData) => dispatch(approveBlog(blogData)),
    deleteBlogFromStorage: (blogData) =>
      dispatch(deleteBlogFromStorage(blogData)),
    deleteBlogFromDB: (blogId) => dispatch(deleteBlogFromDB(blogId)),
  };
};
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "blogs" }])
)(ManageBlogs);
