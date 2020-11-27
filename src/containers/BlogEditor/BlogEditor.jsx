import React from "react";
import {
  Button,
  Container,
  Modal,
  Image,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { useState } from "react";
import { addBlog } from "../../actions/blogActions";
import { connect } from "react-redux";
import imageUploadButton from "../../images/profilePhotoButton.png";
import blogHeaderImageTemp from "../../images/profileHeaderBackground.png";
import "./BlogEditor.css";
import JoditEditor from "jodit-react";

const BlogEditor = (props) => {
  const { blogError, blogErrKey, blogErrMessage, auth, profile } = props;

  const editor = React.useRef(null);
  const config = {
    readonly: false,
    toolbar: true,
  };

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [successModalShow, setSuccessModalShow] = React.useState(false);
  const [blogHeaderImage, setBlogHeaderImage] = useState(null);

  const handleHeaderImageInputChange = (e) => {
    if (e.target.files[0]) {
      setBlogHeaderImage(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    const data = {
      blogId: new Date().getTime() + title.split(" ").join(""),
      userId: auth.uid,
      author: profile.fullName,
      authorProfileImage: profile.imageURL,
      authorJobTitle: profile.jobTitle,
      date: new Date().toDateString(),
      title,
      content,
      isApproved: false,
      comments: [],
    };

    props.addBlog(blogHeaderImage, data);
    setSuccessModalShow(true);
  };

  const SuccessModal = (props) => {
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Adding a new blog
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {blogError && blogErrKey === "addBlog" ? (
            <div className="errMsgContainer">
              <b>{blogError}</b>
              <div className="errMsg">{blogErrMessage}</div>
            </div>
          ) : (
            <p>A new blog has been added successfully</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={() => {
              props.onHide();
              props.closeBlogEditor();
            }}
          >
            Done
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const imgSrc = blogHeaderImage || blogHeaderImageTemp;

  return (
    <div>
      <Container>
        <div className="d-flex justify-content-center">
          <Image src={imgSrc} className="w-100" height="200" alt="" />
          <div class="blogHeaderImage">
            <label for="blogHeaderImage">
              <img src={imageUploadButton} alt="Blog Header" />
            </label>
            <input
              id="blogHeaderImage"
              type="file"
              onChange={handleHeaderImageInputChange}
            />
          </div>
        </div>

        <InputGroup className="mb-5 mt-5">
          <InputGroup.Append>
            <InputGroup.Text id="basic-addon">Blog Title</InputGroup.Text>
          </InputGroup.Append>
          <FormControl
            placeholder="Add a title here for your blog"
            aria-label="Blog title"
            aria-describedby="basic-addon"
            type="text"
            onInput={(e) => {
              setTitle(e.target.value);
            }}
          />
        </InputGroup>
      </Container>

      <Container>
        <JoditEditor
          ref={editor}
          config={config}
          tabIndex={1}
          onChange={(TextAreaValue) => setContent(TextAreaValue)}
          value={content}
        />
      </Container>

      <Container className="mt-5 mb-5">
        <Button variant="success" className="mr-4" onClick={handleSubmit}>
          Add a new blog
        </Button>
        <Button variant="danger" onClick={() => props.closeBlogEditor()}>
          Cancel
        </Button>
      </Container>

      <SuccessModal
        show={successModalShow}
        onHide={() => setSuccessModalShow(false)}
        blogError={blogError}
        blogErrKey={blogErrKey}
        blogErrMessage={blogErrMessage}
        closeBlogEditor={props.closeBlogEditor}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    blogError: state.blog.blogError,
    blogErrKey: state.blog.blogErrKey,
    blogErrMessage: state.blog.blogErrMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addBlog: (blogHeaderImage, blogBodyImage, data) =>
      dispatch(addBlog(blogHeaderImage, blogBodyImage, data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogEditor);
