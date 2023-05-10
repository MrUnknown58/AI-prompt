import Prompt from "@models/Prompt";
import { connectToDB } from "@utils/database";

export const GET = async (req) => {
  try {
    await connectToDB();
    const response = await Prompt.find({}).populate("creator");
    return new Response(JSON.stringify(response), { status: 202 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to fetch the prompt", { status: 404 });
  }
};