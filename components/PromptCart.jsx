"use client";
import Image from "next/image";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { Tooltip } from "@mui/material";
const PromptCart = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const path = usePathname();
  const router = useRouter();
  const [copied, setcopied] = useState("");
  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(post.prompt);
    setcopied(post.prompt);
    setTimeout(() => setcopied(""), 5000);
  };
  return (
    // <div>PromptCart</div>
    <>
      <div class="flex flex-col-reverse flex-1 break-inside-avoid rounded-lg border border-gray-300 bg-white/50 bg-clip-padding p-6 pb-4 backdrop-blur-lg backdrop-filter md:w-[360px] h-[230px] w-full">
        {/* <div class="bg-gray-800 bg-opacity-40 p-6 rounded-lg"> */}
        <div className="flex justify-between">
          <div className="flex items-center">
            {session?.user.id === post?.creator?._id && path === "/profile" ? (
              <div className="space-x-5">
                <Tooltip title="Edit" placement="top">
                  <ModeEditOutlineIcon
                    className="cursor-pointer"
                    onClick={handleEdit}
                  />
                </Tooltip>
                <Tooltip title="Delete" placement="top">
                  <DeleteIcon
                    className="cursor-pointer"
                    onClick={handleDelete}
                  />
                </Tooltip>
              </div>
            ) : (
              ""
            )}
          </div>
          <div
            className="flex flex-col items-end cursor-pointer"
            onClick={() => router.push(`/profile/${post?.creator?._id}`)}
          >
            <Image
              class="rounded object-contain object-center mb-6 flex justify-end"
              src={post.creator.image}
              alt="user_image"
              height={40}
              width={40}
            />
            <h3 class="tracking-widest text-indigo-400 text-xs font-medium title-font">
              {post?.creator?.username}
            </h3>
            <h4 class="tracking-widest text-indigo-400 text-xs font-medium title-font">
              {post?.creator?.email}
            </h4>
          </div>
        </div>
        <div className="flex justify-between">
          {/* <Tooltip title="Move to Chat it Out and Paste your Prompt"> */}
          <div>
            <h2
              class="md:w-[280px] w-full text-lg font-medium title-font mb-4 cursor-pointer"
              style={{
                overflow: "hidden",
                "text-overflow": "ellipsis",
                display: "-webkit-box",
                "-webkit-line-clamp": "2",
                "-webkit-box-orient": "vertical",
              }}
              onClick={() => {
                handleCopyPrompt();
                router.push("/chat_it_out");
              }}
            >
              {post.prompt}
            </h2>
            <div
              onClick={() => {
                path === "/"
                  ? handleTagClick(post.tag)
                  : console.log("No search available here");
              }}
            >
              <p class="leading-relaxed text-base text-blue-300 cursor-pointer">
                {post.tag}
              </p>
            </div>
          </div>
          {copied !== post.prompt ? (
            <ContentCopyIcon
              className="cursor-pointer"
              onClick={handleCopyPrompt}
            />
          ) : (
            <CheckCircleIcon style={{ color: "green" }} />
          )}
          {/* </Tooltip> */}
        </div>

        {/* </div> */}
      </div>
    </>
  );
};

export default PromptCart;
