import React from "react";
import "./index.css";
import { Image, Container, Button } from "react-bootstrap";
import profilePhotoButton from "../../images/profilePhotoButton.png";

const Header = (props) => {
  const {
    headerBackground,
    profilePhoto,
    /* A string that represents the page name where's the header invoked */
    pageName,
    isOwner,
    extraComponents,
    userId,
  } = props;
  const [image, setImage] = React.useState(null);
  const [uploadBtnVisibility, setUploadBtnVisibility] = React.useState(
    "hidden"
  );
  const [hasUploadSucceeded, setHasUploadSucceeded] = React.useState(false);

  const handlePhotoInputChange = (e) => {
    if (e.target.files[0]) {
      setHasUploadSucceeded(true);
      setImage(e.target.files[0]);
    }
  };
  const handlePhotoUpload = () => {
    setUploadBtnVisibility("hidden");
    props.updateProfilePhoto(image, userId);
  };

  return (
    <div
      className="dynamicHeader"
      style={{ backgroundImage: `url(${headerBackground})` }}
    >
      <Container className="d-flex">
        {/* Check if the header is used for the profile page */}
        {pageName === "profile" ? (
          <div className="profilePhotoContainer">
            <Image
              src={profilePhoto}
              alt="Profile"
              roundedCircle
              width="200"
              height="200"
            />
            {/* Check for the owner to allow profile photo changing */}
            {isOwner && (
              <div class="profilePhotoBtn">
                <label for="fileInput">
                  <img src={profilePhotoButton} alt="Profile changing button" />
                </label>
                <input
                  id="fileInput"
                  type="file"
                  onChange={handlePhotoInputChange}
                  onClick={() => setUploadBtnVisibility("visible")}
                />
                <div
                  className="d-flex"
                  style={{ visibility: uploadBtnVisibility }}
                >
                  <Button
                    variant="success"
                    size="sm"
                    className="mr-1"
                    disabled={!hasUploadSucceeded}
                    onClick={handlePhotoUpload}
                  >
                    Upload
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => setUploadBtnVisibility("hidden")}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Image
            src={profilePhoto}
            alt="Profile"
            roundedCircle
            width="200"
            height="200"
          />
        )}
        {/* Render other components if they exist */}
        <div class={pageName + "HeaderExtraComponents"}>{extraComponents}</div>
      </Container>
    </div>
  );
};

export default Header;
