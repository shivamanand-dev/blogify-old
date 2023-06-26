/* eslint-disable @next/next/no-img-element */
import { Modal } from "@mui/material";
import { useState } from "react";

import { PrimaryButton } from "../Buttons";
import { StyledUploadPicture } from "./StyledUploadPicture";

function UploadPicture({
  open,
  handleClose,
  title,
  currentImage,
  rounded = false,
  onSubmit,
  setFileType,
  setNewPictureFile,
  newPictureFile,
}) {
  const [currentProfilePic, setCurrentProfilePic] = useState(currentImage);

  const onChangePicture = (e) => {
    const file = e.target.files[0];

    setFileType(file.type);
    setNewPictureFile(file);

    const reader = new FileReader();
    // const url = reader.readAsDataURL(file);

    reader.addEventListener("load", () => {
      setCurrentProfilePic(reader.result);
    });

    reader.readAsDataURL(file);
  };

  return (
    <Modal
      keepMounted
      open={open}
      onClose={handleClose}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
      className="modalContainer"
    >
      <StyledUploadPicture rounded={rounded}>
        <div className="box">
          <div className="image-container">
            <img
              src={currentProfilePic}
              height={50}
              style={{ cursor: "pointer" }}
              alt="profilePic"
              className="profilePic"
            />
          </div>

          <div className="image-form">
            <h3 htmlFor="profilePic">{title}</h3>
            <input type="file" accept="image/*" onChange={onChangePicture} />
          </div>

          <PrimaryButton
            buttonText="Submit"
            disabled={!newPictureFile}
            onClick={onSubmit}
          />
        </div>
      </StyledUploadPicture>
    </Modal>
  );
}

export default UploadPicture;
