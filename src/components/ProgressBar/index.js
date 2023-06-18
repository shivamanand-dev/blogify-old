import { LinearProgress } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

import { userState } from "@/redux/userSlice";

function ProgressBar() {
  const userStateData = useSelector(userState);

  return (
    <>
      {userStateData.loading && (
        <div className="progressBar">
          <LinearProgress color="success" />
        </div>
      )}
    </>
  );
}

export default ProgressBar;
