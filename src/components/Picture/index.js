/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

import ChanegeProfilePicModal from "../ChanegeProfilePicModal";
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

      <ChanegeProfilePicModal
        open={openChangeDpModal}
        handleClose={switchModal}
      />
    </StyledPicture>
  );
}

export default Picture;
