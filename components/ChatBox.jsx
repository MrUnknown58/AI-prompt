"use client";
import {
  BottomNavigation,
  BottomNavigationAction,
  Button,
  CircularProgress,
  TextField,
  Tooltip,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState, useTransition } from "react";
import SaveIcon from "@mui/icons-material/Save";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useSession } from "next-auth/react";
import FetchChatResponse from "./actions";

const useStyles = makeStyles((theme) => ({
  bottomNavigation: {
    position: "fixed",
    bottom: 0,
    left: 0,
    // width: "100%",
    padding: 8,
    // backgroundColor: "transparent",
    // boxShadow: theme.shadows[4],
    display: "flex",
  },
}));

const ChatBox = ({ chatMessages, NewChatMessages }) => {
  const classes = useStyles();
  const { data: session } = useSession();
  const [inputValue, setInputValue] = useState("");
  const [loading, setloading] = useState(false);
  const [saved, setsaved] = useState(false);
  let [isPending, startTransition] = useTransition();
  useEffect(() => {
    setloading(chatMessages.length % 2 === 0);
  }, [chatMessages]);
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
  const sendMessage = async () => {
    console.log(inputValue);
    if (inputValue) {
      setInputValue("");
      const response = await fetch("api/ai_chat", {
        method: "POST",
        body: JSON.stringify({
          inputValue: inputValue,
          chatMessages: chatMessages,
        }),
      });
      console.log(response);
      if (!response.ok) {
        setloading(false);
        NewChatMessages([
          ...chatMessages,
          {
            role: "user",
            content: inputValue,
          },
          {
            role: "assistant",
            content:
              "Sorry, You are not allowed to send more than three message per minute. Please try again after some time..",
          },
        ]);
      } else {
        const data = await response.json();
        console.log(data);
        NewChatMessages([
          ...chatMessages,
          {
            role: "user",
            content: inputValue,
          },
          {
            role: "assistant",
            content: data?.message?.content,
          },
        ]);
      }
    }
  };
  return (
    <>
      {/* <div className="flex flex-row py-2 items-center md:top-[38rem] md:left-[13rem] absolute inset-x-0 bottom-0 bg-white w-[55%] h-[60px]">
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
                  sendMessage();
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
              type="submit"
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
                sendMessage();
              }}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
       */}
      <div>
        <div
          className={`${classes.bottomNavigation} space-x-4 bg-white flex flex-col px-5 md:ml-[20%] md:w-[60%] w-[100%] space-y-5`}
        >
          <div className="flex justify-center">
            {loading && (
              <>
                <CircularProgress color="primary" />
              </>
            )}
          </div>
          <div className="flex">
            <TextField
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
                  sendMessage();
                }
              }}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
              placeholder="Type your message"
              fullWidth
            />
            {session?.user?.id &&
              (!saved ? (
                <div className="px-5 flex items-center">
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
                <div className="px-5 flex items-center">
                  <CheckCircleIcon style={{ color: "green" }} />
                </div>
              ))}

            <Button
              variant="contained"
              type="submit"
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
                sendMessage();
              }}
            >
              Send{loading ? "ing..." : ""}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBox;
