"use client";
import Form from "@components/Form";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
const EditPrompt = () => {
  // console.log(params.id);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();
  const { data: session } = useSession();
  const [post, setpost] = useState("");
  const [submitting, setsubmitting] = useState(false);
  const editPrompt = async (e) => {
    console.log(id);
    e.preventDefault();
    if (!id) return alert("Prompt ID Not Found.");
    setsubmitting(true);
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
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
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/posts/${id}`);
      const result = await response.json();
      setpost({
        prompt: result.prompt,
        tag: result.tag,
        creator: result.creator,
      });
    };
    if (id) fetchData();
  }, [id]);
  return (
    <>
      <Form
        type="Edit"
        post={post}
        setpost={setpost}
        submitting={submitting}
        handleSubmit={editPrompt}
      />
    </>
  );
};

export default EditPrompt;
