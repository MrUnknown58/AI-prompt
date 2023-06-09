import Prompt from "@models/Prompt";
import { connectToDB } from "@utils/database";

//GET (read)
export const GET = async (req) => {
  try {
    await connectToDB();
    const response = await Prompt.find({}).populate("creator");
    return new Response(JSON.stringify(response), { status: 200 });
  } catch (err) {
    console.log("Logging error..");
    console.log(err);
    return new Response(err, { status: 404 });
  }
};
