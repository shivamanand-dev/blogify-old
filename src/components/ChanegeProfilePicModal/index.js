import { Modal } from "@mui/material";

import { StyledChangeProfilePicModal } from "./StyledChangeProfilePicModal";

function ChangeProfilePicModal({ open, handleClose }) {
  return (
    <Modal
      keepMounted
      open={open}
      onClose={handleClose}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
      className="modalContainer"
    >
      <StyledChangeProfilePicModal>
        <div className="box">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
          magni sed assumenda alias dicta. Laborum quo corrupti pariatur. Eum
          quam maxime non alias aliquam consequuntur perferendis quidem voluptas
          inventore tempora.
        </div>
      </StyledChangeProfilePicModal>
    </Modal>
  );
}

export default ChangeProfilePicModal;
