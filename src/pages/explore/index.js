import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import BlogsPostCard from "@/components/BlogsPostCard";
import { StyledExplorePage } from "@/components/StyledPages";
import { setLoading } from "@/redux/userSlice";
import { blogServices } from "@/utils/firebase/services/blogServices";

function ExplorePage() {
  const dispatch = useDispatch();

  const [blogsData, setblogsData] = useState();

  const getBlogs = async () => {
    dispatch(setLoading(true));
    const data = await blogServices.getBlog();
    setblogsData(data);
    dispatch(setLoading(false));
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <StyledExplorePage>
      <h3 className="heading">Explore</h3>

      {blogsData?.map((e, i) => {
        return (
          <BlogsPostCard
            key={i}
            title={e.data.title}
            description={e.data.description}
            uid={e.id}
          />
        );
      })}
    </StyledExplorePage>
  );
}

export default ExplorePage;
