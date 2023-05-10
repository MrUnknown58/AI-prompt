"use client";
import Form from "@components/Form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";
const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [post, setpost] = useState("");
  const [submitting, setsubmitting] = useState(false);
  const createPrompt = async (e) => {
    e.preventDefault();
    setsubmitting(true);
    try {
      const response = await fetch("api/posts/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          userId: session?.user.id,
        }),
      });
      console.log(response);
      if (response.ok) {
        router.push("/");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setsubmitting(false);
    }
  };
  return (
    <>
      <Form
        type="Create"
        post={post}
        setpost={setpost}
        submitting={submitting}
        handleSubmit={createPrompt}
      />
    </>
  );
};

export default CreatePrompt;
