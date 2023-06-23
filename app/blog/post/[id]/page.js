"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import useStore from "@/app/store";
import ParseHTML from "@/app/components/parseHTML";

async function getPostDetails(id, path) {
  const res = await fetch(
    `https://cms.cloudmeshsolutions.com/api/blog/${id}?pagePath=${path}`
  );
  const details = await res.json();

  return details;
}

const Page = ({ params }) => {
  const searchParams = useSearchParams();
  const pagePath = searchParams.get("pagePath");
  const [details, setDetails] = useState(null);

  const router = useRouter();
  const userInfo = useStore((state) => state?.userInfo ?? {});

  useEffect(() => {
    const fetchData = async () => {
      if (userInfo?.email) {
        const post = await getPostDetails(params.id, pagePath);
        setDetails(post.data.Blog);
      } else {
        router.push("/login");
      }
    };
    fetchData();
  }, [userInfo]);
  return (
    <div className="pt-10">
      <h1 className="text-4xl font-bold">{details?.title?.en}</h1>
      <div className="flex gap-4 items-center my-8">
        <Image
          src={details?.thumbnail?.en}
          width={100}
          height={200}
          alt={details?.title?.en}
          className="rounded-full w-16 h-16 object-cover"
        />
        <div>
          <h2>{details?.author}</h2>
          <p className="text-gray-600">{details?.readTime?.en} read</p>
        </div>
      </div>
      <Image
          src={details?.thumbnail?.en}
          width={900}
          height={500}
          alt={details?.title?.en}
          className="object-cover"
        />
      <div className="flex flex-col gap-4 my-4">
        <p>{details?.description?.en}</p>
        {<ParseHTML htmlString={details?.content?.en}/>}
      </div>
    </div>
  );
};

export default Page;
