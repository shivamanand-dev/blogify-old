import { Box, Modal } from "@mui/material";
import React from "react";

import { PrimaryButton } from "../Buttons";
import InputField from "../InputBox";

function UpdateProfileModal({ isOpen = false, handleClose }) {
  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: " 50%",
          transform: "translate(-50%, -50%)",
          width: "400px",
          backgroundColor: "rgb(18, 18, 18)",
          boxShadow:
            "rgba(0, 0, 0, 0.2) 0px 11px 15px -7px, rgba(0, 0, 0, 0.14) 0px 24px 38px 3px, rgba(0, 0, 0, 0.12) 0px 9px 46px 8px",
          padding: "32px",
          borderRadius: "0.5rem",
        }}
      >
        <h2 id="parent-modal-title">Edit Profile</h2>
        <InputField placeholder="Name" />

        <PrimaryButton buttonText="Submit" />
      </Box>
    </Modal>
  );
}

export default UpdateProfileModal;
