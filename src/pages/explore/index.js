import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch } from "react-redux";

import BlogsPostCard from "@/components/BlogsPostCard";
import CircularLoader from "@/components/CircularLoader";
import { StyledExplorePage } from "@/components/StyledPages";
import { setLoading } from "@/redux/userSlice";
import { blogServices } from "@/utils/firebase/services/blogServices";

function ExplorePage() {
  const dispatch = useDispatch();

  const [blogsData, setblogsData] = useState();
  const [postLimit, setpostLimit] = useState(5);
  const [hasMoreData, sethasMoreData] = useState(true);

  const getBlogs = async (limit) => {
    dispatch(setLoading(true));
    const data = await blogServices.getBlog(undefined, limit);
    setblogsData(data);

    // Need to change the logic for has more
    if (data.length < postLimit - 1) {
      sethasMoreData(false);
    }
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
      <InfiniteScroll
        dataLength={blogsData?.length || 0}
        next={loadMoreData}
        hasMore={hasMoreData}
        loader={<CircularLoader />}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You are all cought up</b>
          </p>
        }
      >
        {blogsData &&
          blogsData?.map((e, i) => {
            return <BlogsPostCard key={i} data={e.data} id={e.id} />;
          })}
      </InfiniteScroll>
    </StyledExplorePage>
  );
}

export default ExplorePage;
