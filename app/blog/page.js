"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useStore from "../store";
import { useRouter } from "next/navigation";
async function getPosts() {
  const res = await fetch(
    `https://cms.cloudmeshsolutions.com/api/blog?filter={"websiteAdmin":"646ce566317ec72916785a0c"}`
  );
  const posts = await res.json();
  console.log(posts)
  return posts;
}
const Page = () => {
  const router = useRouter();
  const userInfo = useStore((state) => state?.userInfo ?? {});
  console.log("user info: ", userInfo);
  const [posts, setPosts] = useState({})
  
  useEffect(() => {
    const fetchData = async () => {
      if (userInfo?.email) {
        const data = await getPosts();
        setPosts(data);
      } else {
        router.push("/login");
      }
    };
    fetchData();
  }, [userInfo]);


  return (
    <div className="pt-10 flex flex-col gap-8">
      {posts?.data
        ? posts?.data.Blog.map((post, index) => {
            return (
              <div key={index} className="flex flex-col gap-2">
                <Link
                  href={`/blog/post/${post.id}?pagePath=${post.pagePath}`}
                  className="text-2xl hover:text-gray-500"
                >
                  {post.title.en}
                </Link>
                <p>{post.description.en}</p>
                <p className="text-sm text-gray-500 pb-2">- {post.author}</p>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default Page;
