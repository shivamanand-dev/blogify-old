import { useEffect, useState } from "react";

import BlogsPostCard from "@/components/BlogsPostCard";
import { blogServices } from "@/utils/firebase/services/blogServices";

function ExplorePage() {
  const [blogsData, setblogsData] = useState([]);
  const getBlogs = async () => {
    const data = await blogServices.getBlog();
    setblogsData(data);
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div>
      <h3>Explore</h3>

      {blogsData.map((e, i) => {
        return (
          <BlogsPostCard
            key={i}
            title={e.data.title}
            description={e.data.description}
          />
        );
      })}
    </div>
  );
}

export default ExplorePage;
