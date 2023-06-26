import { PrimaryButton } from "../Buttons";

function NavButtons({ title, onClick }) {
  return (
    <PrimaryButton
      buttonText={title}
      variant="outlined"
      onClick={onClick}
      color="info"
      customStyle={{ fontWeight: "700" }}
    />
  );
}

export default NavButtons;
