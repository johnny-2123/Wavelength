import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { uploadUserProfilePic } from "../../../store/session";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../../config/firebase";
import DropInAnimation from "../../Animations/DropIn";
import "./EditUser.css";

const EditUser = ({ user, handleLogout }) => {
  const [previewImage, setPreviewImage] = useState(user?.imageUrl);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (file) {
      try {
        const imageRef = ref(storage, `images/${user?.guid}.jpg`);
        await uploadBytes(imageRef, file);

        const downloadURL = await getDownloadURL(imageRef);
        setPreviewImage(downloadURL);

        user.imageUrl = downloadURL;
      } catch (error) {}
    }
  };

  return (
    <DropInAnimation>
      <div className="EditUserMainDiv">
        <div
          style={{
            backgroundImage: `url(${previewImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            borderRadius: "50%",
          }}
          className="userProfilePictureDiv"
        >
          <label>
            <input
              type="file"
              id="profilePictureInput"
              style={{
                opacity: 0,
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
              onChange={handleImageUpload}
            />
            <i className="fa-solid fa-plus"></i>
          </label>
        </div>
        <div className="userProfileHeader">
          <h5 id="profileUsername">{user.username}</h5>
          <h5 id="profileEmail">{user.email}</h5>
        </div>
      </div>
    </DropInAnimation>
  );
};

export default EditUser;
