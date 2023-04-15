import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import { Typography } from "@mui/material";
import { useState } from "react";

import Picture from "@/components/Picture";
import { useAuth } from "@/context/AuthContext";

// import { authApi } from "@/utils/firebase/auth";
import { PrimaryButton } from "../Buttons";
import { StyledUserAccountInfo } from "./StyledUserAccountInfo";
// import { signOut } from "firebase/auth";

function UserAccountInfo({ src, name, email, follower, following }) {
  const [editProfile, setEditProfile] = useState(false);
  const [displayName, setDisplayName] = useState(name);

  // eslint-disable-next-line no-unused-vars
  const { currentUser, logout, updateUser } = useAuth();
  const switchProfileModal = () => {
    setEditProfile(!editProfile);
  };

  const onClickSaveName = async () => {
    switchProfileModal();
    // console.log("sadf");
    await updateUser(displayName);
  };
  // console.log(currentUser);
  return (
    <StyledUserAccountInfo>
      <div className="flex">
        <Picture src={src} rounded={true} />
        <div>
          {!editProfile && (
            <Typography variant="h4" ml={3}>
              {name}
              <PrimaryButton
                buttonText=""
                onClick={switchProfileModal}
                startIcon={<EditIcon />}
                variant="text"
              />
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

      {/* <UpdateProfileModal
        isOpen={editProfileModal}
        handleClose={switchProfileModal}
      /> */}

      <PrimaryButton
        buttonText="lo"
        onClick={() => {
          logout();
        }}
      />
    </StyledUserAccountInfo>
  );
}

export default UserAccountInfo;
