import { stringify } from "postcss";

export const POST = async (req) => {
  const { inputValue, chatMessages } = await req.json();
  console.log(chatMessages);
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
      Authorization: "Bearer " + process.env.AI_AUTH_KEY,
    },
  });
  console.log(data);
  const res = await data.json();
  console.log(res);
  console.log(JSON.stringify({ ...chatMessages, res }));
  const message = res.choices[0].message;
  //   console.log(message);
  return new Response(JSON.stringify({ message }), {
    status: 200,
  });
  //   NewChatMessages([
  //     ...chatMessages,
  //     {
  //       role: "user",
  //       content: inputValue,
  //     },
  //     {
  //       role: "assistant",
  //       content: res?.choices[0]?.message?.content,
  //     },
  //   ]);
};
