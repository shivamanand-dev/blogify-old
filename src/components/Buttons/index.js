import { StyledButton } from "./StyledButton";

function Button({
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
    <StyledButton>
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
    </StyledButton>
  );
}

export default Button;
