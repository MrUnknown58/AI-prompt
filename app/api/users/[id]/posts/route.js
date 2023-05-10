import Prompt from "@models/Prompt";
import { connectToDB } from "@utils/database";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const response = await Prompt.find({ creator: params.id }).populate(
      "creator"
    );
    return new Response(JSON.stringify(response), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to fetch the prompt", { status: 404 });
  }
};
