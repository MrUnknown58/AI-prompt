import Prompt from "@models/Prompt";
import { connectToDB } from "@utils/database";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const response = await Prompt.find({}).populate("creator");
    console.log("All Posts API implemented");
    return new Response(JSON.stringify(response), { status: 200 });
  } catch (e) {
    console.log(e);
    return new Response(JSON.stringify("Failed to Fetch the Feed"), {
      status: 404,
    });
  }
};
