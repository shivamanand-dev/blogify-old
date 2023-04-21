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
  customStyle,
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
      sx={customStyle}
    >
      {buttonText}
    </Button>
  );
}

export default PrimaryButton;
