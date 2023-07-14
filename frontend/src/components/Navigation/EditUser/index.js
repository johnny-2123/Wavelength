import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { uploadUserProfilePic } from "../../../store/session";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../../config/firebase";
import "./EditUser.css";
console.log("storage", storage);

const EditUser = ({ user, handleLogout }) => {
  console.log("user in EditUser", user);
  console.log("user?.guid", user?.guid);
  const [previewImage, setPreviewImage] = useState(user?.imageUrl);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    console.log("file", file);

    if (file) {
      try {
        console.log("before upload");
        const imageRef = ref(storage, `images/${user?.guid}.jpg`);
        console.log("after upload");
        console.log("imageRef", imageRef);
        await uploadBytes(imageRef, file);

        const downloadURL = await getDownloadURL(imageRef);
        console.log("downloadURL", downloadURL);
        setPreviewImage(downloadURL);

        // Update user model with imageURL
        user.imageUrl = downloadURL;
        // TODO: Make an API call to update the user model in the backend

        console.log("Image uploaded successfully");
      } catch (error) {
        console.log("Error uploading image:", error);
      }
    }
  };

  return (
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
  );
};

export default EditUser;
