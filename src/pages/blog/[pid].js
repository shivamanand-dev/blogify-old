import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { StyledBlogPost } from "@/components/StyledPages";
import { blogServices } from "@/utils/firebase/services/blogServices";

function BlogPost() {
  const router = useRouter();
  const pid = router.query.pid;

  const [blogPostData, setBlogPostData] = useState();

  const getBlogData = async (uid) => {
    const data = await blogServices.getSinglePost(uid);
    setBlogPostData(data);
  };

  useEffect(() => {
    if (pid) {
      getBlogData(pid);
    }
  }, [pid]);

  return (
    <StyledBlogPost>
      {blogPostData?.title} <p>{blogPostData?.content}</p>
    </StyledBlogPost>
  );
}

export default BlogPost;
