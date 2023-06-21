/* eslint-disable @next/next/no-img-element */
import { Modal } from "@mui/material";
import { useState } from "react";

import { PrimaryButton } from "../Buttons";
import InputField from "../InputField";
import { StyledUploadPicture } from "./StyledUploadPicture";

function UploadPicture({
  open,
  handleClose,
  title,
  currentImage,
  rounded = false,
}) {
  const [currentProfilePic, setCurrentProfilePic] = useState(currentImage);
  const [newProfilePicFile, setNewProfilePicFile] = useState();

  const onChangeProfilePic = (e) => {
    const file = e.target.files[0];

    setNewProfilePicFile(file);

    const reader = new FileReader();
    // const url = reader.readAsDataURL(file);

    reader.addEventListener("load", () => {
      setCurrentProfilePic(reader.result);
    });

    reader.readAsDataURL(file);
    // const updatedLogo = file.
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

          <label htmlFor="profilePic">{title}</label>
          <InputField
            type="file"
            name="profilePic"
            onChange={onChangeProfilePic}
          />
          <PrimaryButton buttonText="Submit" disabled={!newProfilePicFile} />
        </div>
      </StyledUploadPicture>
    </Modal>
  );
}

export default UploadPicture;
