import Parser from "html-react-parser";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { StyledBlogPost } from "@/components/StyledPages";
import { setLoading } from "@/redux/userSlice";
import { blogServices } from "@/utils/firebase/services/blogServices";

function BlogPost() {
  const router = useRouter();
  const dispatch = useDispatch();
  const pid = router.query.pid;

  const [blogPostData, setBlogPostData] = useState();

  const getBlogData = async (uid) => {
    dispatch(setLoading(true));
    const data = await blogServices.getSinglePost(uid);
    setBlogPostData(data);
    dispatch(setLoading(false));
  };

  useEffect(() => {
    if (pid) {
      getBlogData(pid);
    }
  }, [pid]);

  return (
    <StyledBlogPost>
      {blogPostData && (
        <>
          <h3>{blogPostData?.title}</h3>
          <h5>{blogPostData?.description}</h5>
          <div>{Parser(blogPostData?.content)}</div>
        </>
      )}
    </StyledBlogPost>
  );
}

export default BlogPost;
