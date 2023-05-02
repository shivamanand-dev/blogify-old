import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import { Typography } from "@mui/material";

import Picture from "@/components/Picture";

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
  return (
    <StyledUserAccountInfo>
      <div className="flex">
        <Picture src={src} rounded={true} />
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
