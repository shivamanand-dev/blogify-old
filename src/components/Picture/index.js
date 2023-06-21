/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable @next/next/no-img-element */
import { useDispatch, useSelector } from "react-redux";

import { setOpenUploadPictureModal, userState } from "@/redux/userSlice";

import UploadPicture from "../UploadPicture";
import { StyledPicture } from "./StyledPicture";

function Picture({
  src,
  rounded = false,
  customStyle = {},
  onSubmit,
  setFileType,
  setNewPictureFile,
  newPictureFile,
}) {
  const userStateData = useSelector(userState);
  const dispatch = useDispatch();

  const switchModal = () => {
    dispatch(setOpenUploadPictureModal(!userStateData.openUploadPictureModal));
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

      {userStateData.openUploadPictureModal && (
        <UploadPicture
          open={userStateData.openUploadPictureModal}
          handleClose={switchModal}
          title="Upload Profile Pic"
          currentImage={src}
          rounded={true}
          onSubmit={onSubmit}
          setFileType={setFileType}
          setNewPictureFile={setNewPictureFile}
          newPictureFile={newPictureFile}
        />
      )}
    </StyledPicture>
  );
}

export default Picture;
