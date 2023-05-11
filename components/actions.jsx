"use server";
const FetchChatResponse = async (
  inputValue,
  chatMessages,
  NewChatMessages,
  setInputValue
) => {
  console.log("Input Value:", inputValue);
  revalidatePath(`/chat_it_out`);
  //   if (inputValue) {
  //     setInputValue("");
  //     const data = await fetch(`https://api.openai.com/v1/chat/completions`, {
  //       body: JSON.stringify({
  //         model: "gpt-3.5-turbo",
  //         temperature: 0.2,
  //         max_tokens: 1000,
  //         messages: [
  //           ...chatMessages,
  //           {
  //             role: "user",
  //             content: String(inputValue),
  //           },
  //         ],
  //       }),
  //       method: "POST",
  //       headers: {
  //         "content-type": "application/json",
  //         Authorization: "Bearer " + process.env.AI_AUTH_KEY,
  //       },
  //     });
  //     console.log(process.env);
  //     const res = await data.json();
  //     console.log(res);
  //     NewChatMessages([
  //       ...chatMessages,
  //       {
  //         role: "user",
  //         content: inputValue,
  //       },
  //       {
  //         role: "assistant",
  //         content: res?.choices[0]?.message?.content,
  //       },
  //     ]);
  //   }
};
export default FetchChatResponse;
