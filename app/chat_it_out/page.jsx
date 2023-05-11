"use client";
import { Button, TextField, Tooltip } from "@mui/material";
import { useRef, useState } from "react";
import Typist from "react-typist";
import ChatBox from "@components/ChatBox";
import { useSession } from "next-auth/react";
import SaveIcon from "@mui/icons-material/Save";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import { CssBaseline, TextField, Button } from "@material-ui/core";
// import { Send as SendIcon } from "@mui/icons-material";

const messages = [
  { role: "assistant", content: "Hello, This is an AI ChatBot, Chat It Out." },
  { role: "assistant", content: "I can answer all of your Questions." },
  { role: "assistant", content: "Wanna know more about me?" },
];

const ChatMessage = ({ message }) => {
  const { data: session } = useSession();
  const isUser = message.role === "assistant";
  const [saved, setsaved] = useState(false);
  const [hovered, sethovered] = useState(false);
  const savePrompt = async (message) => {
    try {
      const response = await fetch("api/posts/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: message,
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
    <div
      className={`flex flex-col ${isUser ? "items-start" : "items-end"} mt-4`}
    >
      <div
        className={`px-4 py-2 rounded-lg flex ${
          isUser
            ? "bg-white text-gray-700"
            : "bg-blue-500 text-white text-right"
        }`}
        onMouseEnter={() => {
          sethovered(true);
        }}
        onMouseLeave={() => {
          sethovered(false);
        }}
      >
        <Typist
          className="MyTypist"
          cursor={{
            show: false,
            blink: true,
            element: "|",
            hideWhenDone: true,
          }}
          avgTypingDelay={10}
        >
          <pre
            style={{
              // "overflow-y": "scroll",
              maxWidth: "80rem",
              // height: "80px",
              padding: "5px",
              "white-space": "pre-wrap",
            }}
          >
            {message.content}
          </pre>
          {/* <Typist.Delay ms={500} /> */}
        </Typist>
        {session?.user?.id &&
          (!saved ? (
            <div
              className={`px-1 ${
                hovered ? "flex" : "hidden"
              } items-center cursor-pointer`}
            >
              <Tooltip title="Save this Prompt" placement="top">
                <SaveIcon
                  style={{ color: "black" }}
                  fontSize="small"
                  onClick={() => {
                    savePrompt(message.content);
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
              <CheckCircleIcon style={{ color: "black" }} />
            </div>
          ))}
        {/* <Typical steps={[message.content, 1000]} cursor="" loop={1} /> */}
      </div>
    </div>
  );
};

const ChatBot = () => {
  const containerRef = useRef(null);
  const [chatMessages, setChatMessages] = useState([...messages]);
  const NewChatMessages = (message) => {
    setChatMessages(message);
  };
  //   useEffect(() => {
  //     const container = containerRef.current;

  //     const handleScroll = () => {
  //       const { scrollTop, scrollHeight, clientHeight } = container;

  //       if (scrollTop + clientHeight === scrollHeight) {
  //         return;
  //       }

  //       container.scrollTo({ top: scrollHeight, behavior: 'smooth' });
  //     };

  //     container.addEventListener('scroll', handleScroll);

  //     return () => {
  //       container.removeEventListener('scroll', handleScroll);
  //     };
  //   }, []);

  return (
    <>
      <div className="h-[91vh] flex flex-col" ref={containerRef}>
        <div className="flex-grow overflow-auto py-4 px-8 pb-[10rem]">
          {chatMessages?.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
        </div>
        <ChatBox
          chatMessages={chatMessages}
          NewChatMessages={NewChatMessages}
        />
      </div>
    </>
  );
};

export default ChatBot;
