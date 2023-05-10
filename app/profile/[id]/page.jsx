"use client";
import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const UserProfile = ({ params }) => {
  const { data: session } = useSession();
  const [posts, setposts] = useState([]);
  const { id } = params;
  console.log(id);
  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/users/${id}/posts`);
      const result = await response.json();
      console.log(result);
      setposts(result);
    };
    if (session?.user.id) fetchPost();
  }, [session?.user.id]);
  return (
    <>
      {/* {console.log(posts)} */}
      <Profile
        name="My"
        desc={`Welcome to ${
          posts.length > 0 && posts[0].creator.username
        }'s personalized profile page. Here you can view his posts and his contributions.`}
        posts={posts}
        // handleEdit={handleEdit}
        // handleDelete={handleDelete}
      />
    </>
  );
};

export default UserProfile;
