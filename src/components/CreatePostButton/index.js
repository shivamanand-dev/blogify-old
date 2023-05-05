import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import { useRouter } from "next/router";

import { StyledCreatePostButton } from "./StyledCreatePostButton";

function CreatePostButton() {
  const router = useRouter();
  return (
    <StyledCreatePostButton>
      <PostAddOutlinedIcon
        onClick={() => {
          router.push("/createPost");
        }}
      />
    </StyledCreatePostButton>
  );
}

export default CreatePostButton;
