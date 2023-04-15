import { Button } from "@mui/material";

function PrimaryButton({
  buttonText = "buttonText",
  color = "primary",
  disabled = false,
  onClick,
  variant = "contained",
  size = "small",
  fullWidth,
  startIcon,
  endIcon,
}) {
  return (
    <Button
      variant={variant}
      color={color}
      disabled={disabled}
      onClick={onClick}
      size={size}
      fullWidth={fullWidth}
      startIcon={startIcon}
      endIcon={endIcon}
    >
      {buttonText}
    </Button>
  );
}

export default PrimaryButton;
