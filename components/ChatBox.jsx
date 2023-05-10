"use client";
import { Button, TextField, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useSession } from "next-auth/react";

const ChatBox = ({ chatMessages, NewChatMessages }) => {
  const { data: session } = useSession();
  const [inputValue, setInputValue] = useState("");
  const [loading, setloading] = useState(false);
  const [saved, setsaved] = useState(false);
  useEffect(() => {
    setloading(chatMessages.length % 2 === 0);
  }, [chatMessages]);
  const handleSendMessage = async () => {
    if (inputValue) {
      setInputValue("");
      const data = await fetch(`https://api.openai.com/v1/chat/completions`, {
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          temperature: 0.2,
          max_tokens: 1000,
          messages: [
            ...chatMessages,
            {
              role: "user",
              content: String(inputValue),
            },
          ],
        }),
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization:
            "Bearer  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",
        },
      });
      const res = await data.json();
      NewChatMessages([
        ...chatMessages,
        {
          role: "user",
          content: inputValue,
        },
        {
          role: "assistant",
          content: res?.choices[0]?.message?.content,
        },
      ]);
    }
  };
  const savePrompt = async () => {
    try {
      const response = await fetch("api/posts/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: inputValue,
          tag: "#Saved_While_Chatting",
          userId: session?.user.id,
        }),
      });
      console.log(response);
      // if (response.ok) {
      // router.push("/");
      // }
    } catch (err) {
      console.log(err);
    } finally {
    }
  };
  return (
    <>
      <div className="flex flex-row py-2 px-4 items-center fixed top-[38rem] left-[13rem] bg-white w-[65%]">
        <div className="flex flex-col w-[100%]">
          {loading && (
            <div className="text-black flex justify-center">Loading...</div>
          )}
          <div className="flex flex-row py-2 px-4 items-center bg-white text-white rounded-[15px]">
            <TextField
              className="flex-grow mr-4 text-white"
              value={inputValue}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  NewChatMessages([
                    ...chatMessages,
                    {
                      role: "user",
                      content: inputValue,
                    },
                  ]);
                  handleSendMessage();
                }
              }}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
              placeholder="Type your message"
              variant="outlined"
            />
            {session?.user?.id &&
              (!saved ? (
                <div className="px-5">
                  <Tooltip title="Save this Prompt" placement="top">
                    <SaveIcon
                      style={{ color: "black" }}
                      onClick={() => {
                        savePrompt();
                        setsaved(true);
                        setTimeout(() => {
                          setsaved(false);
                        }, 5000);
                      }}
                    />
                  </Tooltip>
                </div>
              ) : (
                <div className="px-5">
                  <CheckCircleIcon style={{ color: "green" }} />
                </div>
              ))}
            <Button
              variant="contained"
              color="primary"
              style={{ backgroundColor: loading ? "gray" : "blueviolet" }}
              disabled={loading}
              onClick={() => {
                setloading(true);
                NewChatMessages([
                  ...chatMessages,
                  {
                    role: "user",
                    content: inputValue,
                  },
                ]);
                handleSendMessage();
              }}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBox;
