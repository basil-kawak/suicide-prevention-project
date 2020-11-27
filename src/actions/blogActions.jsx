import {
  ADD_BLOG_SUCCESS,
  ADD_BLOG_ERROR,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_ERROR,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_ERROR,
  BLOG_APPROVAL_SUCCESS,
  BLOG_APPROVAL_ERROR,
  DELETE_BLOG_FROM_STORAGE_SUCCESS,
  DELETE_BLOG_FROM_STORAGE_ERROR,
  DELETE_BLOG_FROM_DB_SUCCESS,
  DELETE_BLOG_FROM_DB_ERROR,
} from "./actionTypes";

export const addBlog = (blogHeaderImage, data) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const storage = getFirebase().storage().ref();
    const metadata = {
      contentType: "image/jpeg",
    };
    storage
      .child(`users/${data.userId}/images/blogs/${data.blogId}/blogHeaderImage`)
      .put(blogHeaderImage, metadata)
      .then((uploadTaskResposive) =>
        uploadTaskResposive.ref.getDownloadURL().then((uploadedPhotoURL) =>
          firestore
            .collection("blogs")
            .doc(data.blogId)
            .set({ imageURL: uploadedPhotoURL, ...data })
        )
      )
      .then(() => {
        dispatch({ type: ADD_BLOG_SUCCESS });
      })
      .catch((err) => {
        dispatch({ type: ADD_BLOG_ERROR, err });
      });
  };
};

export const addComment = (blogId, commentData) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("blogs")
      .doc(blogId)
      .update({ comments: firestore.FieldValue.arrayUnion({ ...commentData }) })
      .then(() => {
        dispatch({ type: ADD_COMMENT_SUCCESS });
      })
      .catch((err) => {
        dispatch({ type: ADD_COMMENT_ERROR, err });
      });
  };
};

export const deleteComment = (blogId, comment) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("blogs")
      .doc(blogId)
      .update({ comments: firestore.FieldValue.arrayRemove(comment) })
      .then(() => {
        dispatch({ type: DELETE_COMMENT_SUCCESS });
      })
      .catch((err) => {
        dispatch({ type: DELETE_COMMENT_ERROR, err });
      });
  };
};

export const approveBlog = (blogData) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("blogs")
      .doc(blogData.blogId)
      .update({ isApproved: blogData.isApproved })
      .then(() => {
        dispatch({ type: BLOG_APPROVAL_SUCCESS });
      })
      .catch((err) => {
        dispatch({ type: BLOG_APPROVAL_ERROR, err });
      });
  };
};

export const deleteBlogFromStorage = (blogData) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const storageRef = getFirebase().storage().ref();
    storageRef
      .child(
        `users/${blogData.userId}/images/blogs/${blogData.blogId}/blogHeaderImage`
      )
      .delete()
      .then(() => {
        dispatch({ type: DELETE_BLOG_FROM_STORAGE_SUCCESS });
      })
      .catch((err) => {
        dispatch({ type: DELETE_BLOG_FROM_STORAGE_ERROR, err });
      });
  };
};

export const deleteBlogFromDB = (blogId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("blogs")
      .doc(blogId)
      .delete()
      .then(() => {
        dispatch({ type: DELETE_BLOG_FROM_DB_SUCCESS });
      })
      .catch((err) => {
        dispatch({ type: DELETE_BLOG_FROM_DB_ERROR, err });
      });
  };
};
