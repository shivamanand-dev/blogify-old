import { Typography } from "@mui/material";

// import Picture from "@/components/Picture";
import { StyledUserAccountInfo } from "./StyledUserAccountInfo";

function UserAccountInfo({
  // src,
  name,
  userName,
  follower,
  following,
}) {
  return (
    <StyledUserAccountInfo>
      <div className="flex">
        {/* <Picture src={src} rounded={true} /> */}
        <div>
          <Typography variant="h4" ml={3}>
            {name}
          </Typography>
          <Typography variant="h6" ml={3}>
            @{userName}
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
