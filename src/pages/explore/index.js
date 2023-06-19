import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import BlogsPostCard from "@/components/BlogsPostCard";
import { StyledExplorePage } from "@/components/StyledPages";
import { setLoading } from "@/redux/userSlice";
import { blogServices } from "@/utils/firebase/services/blogServices";

function ExplorePage() {
  const dispatch = useDispatch();

  const [blogsData, setblogsData] = useState();
  const [postLimit, setpostLimit] = useState(5);

  const getBlogs = async (limit) => {
    dispatch(setLoading(true));
    const data = await blogServices.getBlog(undefined, limit);
    setblogsData(data);
    dispatch(setLoading(false));
  };

  const loadMoreData = async () => {
    setpostLimit(postLimit + 5);
  };

  useEffect(() => {
    getBlogs(postLimit);
  }, [postLimit]);

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

      <button onClick={loadMoreData}>Load More</button>
    </StyledExplorePage>
  );
}

export default ExplorePage;
