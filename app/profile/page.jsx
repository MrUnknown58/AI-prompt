"use client";
import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MyProfile = () => {
  const { data: session } = useSession();
  const [posts, setposts] = useState([]);
  const router = useRouter();
  const handleEdit = async (post) => {
    router.push(`/edit_prompt?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    let hasConfirm = confirm(`Are you sure you want to delete`);
    if (!hasConfirm) {
      return;
    }
    const response = await fetch(`api/posts/${post._id}`, { method: "DELETE" });
    const result = response.json();
    const newPosts = posts.filter((p) => p._id !== post._id);
    console.log(newPosts);
    setposts(newPosts);
  };
  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const result = await response.json();
      setposts(result);
    };
    if (session?.user.id) fetchPost();
  }, [session?.user.id]);
  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page."
      posts={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;

// import Profile from "@components/Profile";
// import { useSession } from "next-auth/react";
// import { useEffect, useState } from "react";
//   const { data: session } = useSession();
//   const [posts, setposts] = useState([]);
//   const handleEdit = () => {};
//   const handleDelete = () => {};
//   useEffect(() => {
//     const fetchUserPost = async () => {
//       console.log(`api/users/${session?.user.id}/posts`);
//       const response = await fetch(`api/users/${session?.user?.id}/posts`);
//       const result = response.json();
//       console.log(result);
//       setposts(result);
//     };
//     if (session) fetchUserPost();
//   }, []);
//   useEffect(async () => {
//     const response = await fetch("/api/posts");
//     const result = await response.json();
//     console.log(result);
//     setposts(result);
//   }, []);
{
  /* <Profile
        name="My"
        posts={posts}
        handleEdit={handleEdit}
        handleDetele={handleDelete}
      /> */
}
