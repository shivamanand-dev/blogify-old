/* eslint-disable @next/next/no-img-element */
import { StyledPicture } from "./StyledPicture";

function Picture({ src, rounded = false, customStyle = {} }) {
  return (
    <StyledPicture rounded={rounded} style={customStyle}>
      <img className="image" src={src} alt="" />
    </StyledPicture>
  );
}

export default Picture;
