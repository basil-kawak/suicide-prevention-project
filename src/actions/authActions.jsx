import {
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  SIGN_OUT_SUCCESS,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
  FACEBOOK_AUTH_SUCCESS,
  FACEBOOK_AUTH_ERROR,
  GOOGLE_AUTH_SUCCESS,
  GOOGLE_AUTH_ERROR,
  UPDATE_SUCCESS,
  UPDATE_ERROR,
  PROFILE_AUTH_DELETE_SUCCESS,
  PROFILE_AUTH_DELETE_ERROR,
  PROFILE_DATA_DELETE_SUCCESS,
  PROFILE_DATA_DELETE_ERROR,
  UPDATE_EMAIL_SUCCESS,
  UPDATE_EMAIL_ERROR,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_ERROR,
  SEND_RESET_PASSWORD_EMAIL_SUCCESS,
  SEND_RESET_PASSWORD_EMAIL_ERROR,
  PHOTO_UPLOAD_SUCCESS,
  PHOTO_UPLOAD_ERROR,
  DELETE_STORAGE_SUCCESS,
  DELETE_STORAGE_ERROR,
  ADD_NEWSLETTER_SUCCESS,
  ADD_NEWSLETTER_ERROR,
} from "./actionTypes";

const addToFirebaseDB = (firestore, data) => {
  const db = firestore.collection("profiles").doc(data.userId);
  db.get().then((doc) => {
    if (!doc.exists) {
      return db.set({ ...data });
    }
  });
};

export const signIn = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: LOGIN_SUCCESS });
      })
      .catch((err) => {
        dispatch({ type: LOGIN_ERROR, err });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: SIGN_OUT_SUCCESS });
      });
  };
};

export const signUp = (newProfile) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    firebase
      .auth()
      .createUserWithEmailAndPassword(newProfile.email, newProfile.password)
      .then((resp) => {
        const data = {
          userId: resp.user.uid,
          firstName: newProfile.firstName,
          lastName: newProfile.lastName,
          fullName: newProfile.fullName,
          imageURL: newProfile.imageURL,
          email: newProfile.email,
          provider: resp.user.providerData[0].providerId,
          userType: "SUBSCRIBER",
        };
        return addToFirebaseDB(firestore, data);
      })
      .then(() => {
        dispatch({ type: SIGN_UP_SUCCESS });
      })
      .catch((err) => {
        dispatch({ type: SIGN_UP_ERROR, err });
      });
  };
};

export const facebookAuth = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(facebookAuthProvider)
      .then((resp) => {
        const data = {
          userId: resp.user.uid,
          firstName: null,
          lastName: null,
          fullName: resp.user.displayName,
          imageURL: resp.user.photoURL + "?type=large",
          email: resp.user.email,
          provider: resp.user.providerData[0].providerId,
          userType: "SUBSCRIBER",
        };
        return addToFirebaseDB(firestore, data);
      })
      .then(() => {
        dispatch({ type: FACEBOOK_AUTH_SUCCESS });
      })
      .catch((err) => {
        dispatch({ type: FACEBOOK_AUTH_ERROR, err });
      });
  };
};

export const googleAuth = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then((resp) => {
        const data = {
          userId: resp.user.uid,
          firstName: null,
          lastName: null,
          fullName: resp.user.displayName,
          imageURL: resp.user.photoURL + "?type=large",
          email: resp.user.email,
          provider: resp.user.providerData[0].providerId,
          userType: "SUBSCRIBER",
        };
        return addToFirebaseDB(firestore, data);
      })
      .then(() => {
        dispatch({ type: GOOGLE_AUTH_SUCCESS });
      })
      .catch((err) => {
        dispatch({ type: GOOGLE_AUTH_ERROR, err });
      });
  };
};

export const updateProfile = (profileInfo) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("profiles")
      .doc(profileInfo.userId)
      .update(profileInfo)
      .then(() => {
        dispatch({ type: UPDATE_SUCCESS });
      })
      .catch((err) => {
        dispatch({ type: UPDATE_ERROR, err });
      });
  };
};

export const deleteProfileAuth = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const user = firebase.auth().currentUser;
    user
      .delete()
      .then(() => {
        dispatch({ type: PROFILE_AUTH_DELETE_SUCCESS });
      })
      .catch((err) => {
        dispatch({ type: PROFILE_AUTH_DELETE_ERROR, err });
      });
  };
};

export const deleteProfileData = (userId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("profiles")
      .doc(userId)
      .delete()
      .then(() => {
        dispatch({ type: PROFILE_DATA_DELETE_SUCCESS });
      })
      .catch((err) => {
        dispatch({ type: PROFILE_DATA_DELETE_ERROR, err });
      });
  };
};

export const updatePasswordAndEmail = (data) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(data.currentEmail, data.currentPassword)
      .then(function (userCredential) {
        const user = userCredential.user;
        if (data.key === "updateEmail") {
          user
            .updateEmail(data.newEmail)
            .then(function () {
              firestore
                .collection("profiles")
                .doc(data.userId)
                .update({ email: data.newEmail });
            })
            .then(() => {
              dispatch({ type: UPDATE_EMAIL_SUCCESS });
            })
            .catch((err) => {
              dispatch({ type: UPDATE_EMAIL_ERROR, err });
            });
        } else {
          user
            .updatePassword(data.newPassword)
            .then(() => {
              dispatch({ type: UPDATE_PASSWORD_SUCCESS });
            })
            .catch((err) => {
              dispatch({ type: UPDATE_PASSWORD_ERROR, err });
            });
        }
      });
  };
};

export const resetPassword = (email) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        dispatch({ type: SEND_RESET_PASSWORD_EMAIL_SUCCESS });
      })
      .catch((err) => {
        dispatch({ type: SEND_RESET_PASSWORD_EMAIL_ERROR, err });
      });
  };
};

export const updateProfilePhoto = (image, userId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const storage = getFirebase().storage().ref();
    const metadata = {
      contentType: "image/jpeg",
    };
    storage
      .child(`users/${userId}/images/profilephoto`)
      .put(image, metadata)
      .then((uploadTaskResposive) =>
        uploadTaskResposive.ref
          .getDownloadURL()
          .then((uploadedPhotoURL) =>
            firestore
              .collection("profiles")
              .doc(userId)
              .update({ imageURL: uploadedPhotoURL })
          )
      )
      .then(() => {
        dispatch({ type: PHOTO_UPLOAD_SUCCESS });
      })
      .catch((err) => {
        dispatch({ type: PHOTO_UPLOAD_ERROR, err });
      });
  };
};

export const deleteProfilePhotoOnStorage = (userId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const storageRef = getFirebase().storage().ref();
    storageRef
      .child(`users/${userId}/images/profilephoto`)
      .delete()
      .then(() => {
        dispatch({ type: DELETE_STORAGE_SUCCESS });
      })
      .catch((err) => {
        dispatch({ type: DELETE_STORAGE_ERROR, err });
      });
  };
};

export const addNewsletter = (email) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("newsLetterSubscribers")
      .doc(email)
      .set({ email })
      .then(() => {
        dispatch({ type: ADD_NEWSLETTER_SUCCESS });
      })
      .catch((err) => {
        dispatch({ type: ADD_NEWSLETTER_ERROR, err });
      });
  };
};
