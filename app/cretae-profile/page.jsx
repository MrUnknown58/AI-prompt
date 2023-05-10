"use client";
// import Profile from "@components/Profile";
// import { useSession } from "next-auth/react";
// import { useEffect, useState } from "react";

const MyProfile = () => {
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
  return (
    <>
      {/* <Profile
        name="My"
        posts={posts}
        handleEdit={handleEdit}
        handleDetele={handleDelete}
      /> */}
      <div>Hello</div>
    </>
  );
};

export default MyProfile;
