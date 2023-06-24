import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import { Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";

import Picture from "@/components/Picture";
import {
  setLoading,
  setOpenUploadPictureModal,
  setUser,
} from "@/redux/userSlice";
import { storageServices } from "@/utils/firebase/services/storageServices";
import { userServices } from "@/utils/firebase/services/userServices";
import { createFileName } from "@/utils/utility/createFileName";

import { PrimaryButton } from "../Buttons";
import { StyledUserAccountInfo } from "./StyledUserAccountInfo";

function UserAccountInfo({
  src,
  name,
  email,
  follower,
  following,
  onClickSaveName,
  setDisplayName,
  editProfile,
  switchProfileModal,
  displayName,
  showEditBtn = false,
}) {
  const dispatch = useDispatch();

  const [fileType, setFileType] = useState();
  const [newPictureFile, setNewPictureFile] = useState();

  const onSubmit = async () => {
    dispatch(setLoading(true));
    const fileName = await createFileName();
    const imageUploadRes = await storageServices.uploadToFirebase(
      newPictureFile,
      fileName,
      "profile",
      fileType
    );

    await userServices.updateUser(email, { profileImageUrl: imageUploadRes });

    const updatedUserData = await userServices.getUser(email);

    dispatch(setUser(updatedUserData));
    dispatch(setOpenUploadPictureModal(false));
    dispatch(setLoading(false));
  };
  return (
    <StyledUserAccountInfo>
      <div className="flex">
        <Picture
          src={src}
          rounded={true}
          onSubmit={onSubmit}
          setFileType={setFileType}
          setNewPictureFile={setNewPictureFile}
          newPictureFile={newPictureFile}
        />
        <div>
          {!editProfile && (
            <Typography variant="h4" ml={3}>
              {name}
              {showEditBtn && (
                <PrimaryButton
                  buttonText=""
                  onClick={switchProfileModal}
                  startIcon={<EditIcon />}
                  variant="text"
                />
              )}
            </Typography>
          )}
          {editProfile && (
            <>
              <input
                type="text"
                style={{ marginLeft: "24px", padding: "0.4rem" }}
                value={displayName}
                onChange={(e) => {
                  setDisplayName(e.target.value);
                }}
              />
              <PrimaryButton
                buttonText=""
                onClick={onClickSaveName}
                startIcon={<DoneIcon />}
                variant="text"
              />
            </>
          )}

          <Typography variant="h6" ml={3}>
            {email}
          </Typography>
        </div>
      </div>

      <div className="flex" style={{ marginTop: 15 }}>
        <Typography variant="h6" ml={3}>
          Follower: {follower}
        </Typography>
        <Typography variant="h6" ml={3}>
          Following: {following}
        </Typography>
      </div>
    </StyledUserAccountInfo>
  );
}

export default UserAccountInfo;
