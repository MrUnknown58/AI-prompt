"use client";
import { useEffect, useState } from "react";
import PromptCart from "./PromptCart";
import { useSession } from "next-auth/react";
const Feed = () => {
  const [search, setsearch] = useState("");
  const [posts, setposts] = useState([]);
  const [searchedPosts, setsearchedPosts] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchdata = async () => {
      const response = await fetch("/api/all_posts/3");
      const result = await response.json();
      console.log(result);
      setposts(result);
      setsearchedPosts(result);
    };
    // if (session?.user.id) fetchdata();
    fetchdata();
  }, [session?.user?.id]);
  const handleSearch = (e, tag) => {
    // const s = e?.target?.value?.toLowerCase();
    const s = e?.target?.value;
    e && setsearch(e?.target?.value);
    // const filteredPosts = posts.filter(
    //   (p) =>
    //     p.creator.username.toLowerCase().includes(s) ||
    //     p.tag.toLowerCase().includes(s) ||
    //     p.prompt.toLowerCase().includes(s) ||
    //     p.tag === tag
    // );
    const filteredPosts = posts.filter(
      (p) =>
        p.creator.username.includes(s) ||
        p.tag.includes(s) ||
        p.prompt.includes(s) ||
        p.tag === tag
    );
    setsearchedPosts(filteredPosts);
  };
  const handleTagClick = (tag) => {
    setsearch(tag);
    handleSearch("", tag);
  };
  return (
    <section className="pt-10 flex flex-col justify-center items-center space-y-5">
      <input
        className="block w-[360px] rounded-md border border-gray-200 bg-white py-2.5 pl-5 pr-12 text-sm shadow-lg font-medium focus:border-black focus:outline-none focus:ring-0"
        placeholder={
          !session?.user?.id
            ? "Please Sign in to use this Feature"
            : "Search Here"
        }
        value={search}
        disabled={!session?.user.id}
        onChange={(e) => {
          handleSearch(e, "");
        }}
      />
      <div className="py-8 grid md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mt-[1.5rem]">
        {/* <PromptList data={searchedPosts} handleTagClick={handleTagClick} /> */}

        {searchedPosts?.map((post, index) => {
          return (
            <PromptCart
              post={post}
              key={index}
              handleTagClick={handleTagClick}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Feed;
