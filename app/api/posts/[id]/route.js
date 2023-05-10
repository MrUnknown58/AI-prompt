import Prompt from "@models/Prompt";
import { connectToDB } from "@utils/database";

// GET (read)
export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const response = await Prompt.findById(params.id).populate("creator");
    return new Response(JSON.stringify(response), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to fetch the prompt", { status: 404 });
  }
};

// PATCH (update)
export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();
  try {
    await connectToDB();
    const response = await Prompt.findById(params.id);
    console.log(response);
    if (!response) {
      return new Response("Prompt Not Found", { status: 404 });
    }
    response.prompt = prompt;
    response.tag = tag;
    console.log(response);
    await response.save();
    return new Response(JSON.stringify("Prompt updated successfully"), {
      status: 203,
    });
  } catch (err) {
    return new Response(JSON.stringify("Prompt updated Failed"), {
      status: 404,
    });
  }
};

// DELETE (delete)
export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    await Prompt.findByIdAndRemove(params.id);
    return new Response(JSON.stringify("Prompt Deleted successfully"), {
      status: 203,
    });
  } catch (e) {
    console.log(e);
    return new Response(JSON.stringify("Prompt deleted failed"), {
      status: 404,
    });
  }
};
