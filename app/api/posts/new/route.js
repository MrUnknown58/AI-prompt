import Prompt from "@models/Prompt";
import { connectToDB } from "@utils/database";
export const POST = async (req, res) => {
  const { userId, prompt, tag } = await req.json();
  // console.log(req);
  // console.log(userId, prompt, tag);
  try {
    await connectToDB();
    const newPrompt = Prompt({
      creator: userId,
      prompt,
      tag,
    });
    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt, { status: 201 }));
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify(err, { status: 404 }));
  }

  // return new Response(JSON.stringify("Request Accepted"));
};
