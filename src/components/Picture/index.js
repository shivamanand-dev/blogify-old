/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

import UploadPicture from "../ChanegeProfilePicModal";
import { StyledPicture } from "./StyledPicture";

function Picture({ src, rounded = false, customStyle = {} }) {
  const [openChangeDpModal, setOpenChangeDpModal] = useState(false);

  const switchModal = () => {
    setOpenChangeDpModal(!openChangeDpModal);
  };
  return (
    <StyledPicture rounded={rounded} style={customStyle}>
      <img
        onClick={switchModal}
        onKeyDown={switchModal}
        className="image"
        src={src}
        alt=""
      />

      {openChangeDpModal && (
        <UploadPicture
          open={openChangeDpModal}
          handleClose={switchModal}
          title="Upload Profile Pic"
          currentImage={src}
          rounded={true}
        />
      )}
    </StyledPicture>
  );
}

export default Picture;
