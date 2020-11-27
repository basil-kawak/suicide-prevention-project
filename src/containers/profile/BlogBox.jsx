import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { updateProfile } from "../../actions/authActions";
import { Button, Row, Col, ListGroup, Image } from "react-bootstrap";
import "./BlogBox.css";
import anonymousImage from "../../images/anonymousImage.png";
import { ADMIN_ROLE } from "../../components/common/roleConstants";

const BlogBox = (props) => {
  const { blog, userType } = props;
  const photoSrc = blog.authorProfileImage || anonymousImage;

  // Delete a blog content from Firestore and also its related files from Storage
  const handleBlogDeletion = () => {
    props.deleteBlogFromStorage(blog);
    props.deleteBlogFromDB(blog.blogId);
  };

  const handleBlockAndActivateButton = () => {
    if (userType === ADMIN_ROLE) {
      if (blog.isApproved) {
        return (
          <Button
            variant="danger"
            className="w-75"
            onClick={() =>
              props.approveBlog({ blogId: blog.blogId, isApproved: false })
            }
          >
            Decline
          </Button>
        );
      } else {
        return (
          <Button
            variant="success"
            className="w-75"
            onClick={() =>
              props.approveBlog({ blogId: blog.blogId, isApproved: true })
            }
          >
            Approve
          </Button>
        );
      }
    } else {
      return (
        <>
          <Button
            variant="danger"
            className="w-75"
            onClick={handleBlogDeletion}
          >
            Delete
          </Button>
        </>
      );
    }
  };

  return (
    <div className="blogBox">
      <Row>
        <Col xs={5}>
          <Link to={"/profiles/" + blog.userId} key={blog.userId}>
            <ListGroup defaultActiveKey="none">
              <ListGroup.Item action className="d-flex h-100">
                <Image
                  src={photoSrc}
                  alt="Profile"
                  roundedCircle
                  width="100"
                  height="100"
                  className="mr-3"
                />
                <div class="blogBoxInfo">
                  <h5>{blog.author}</h5>
                  <p>
                    {blog.authorJobTitle
                      ? blog.authorJobTitle
                      : "No job title available"}
                  </p>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Link>
        </Col>

        <Col xs={5}>
          <Link to={"/blogs/" + blog.blogId} key={blog.blogId}>
            <ListGroup defaultActiveKey="none">
              <ListGroup.Item action className="d-flex">
                <Image
                  src={blog.imageURL}
                  alt="Profile"
                  thumbnail
                  width="100"
                  className="mr-3"
                />
                <div class="blogBoxInfo">
                  <h5>{blog.title}</h5>
                  <p>{blog.date}</p>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Link>
        </Col>

        <Col
          xs={2}
          className="d-flex flex-column pt-2 pb-2 justify-content-around"
        >
          {handleBlockAndActivateButton()}
        </Col>
      </Row>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateProfile: (profileInfo) => dispatch(updateProfile(profileInfo)),
  };
};

export default connect(null, mapDispatchToProps)(BlogBox);
