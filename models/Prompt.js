import mongoose, { Schema, model, models } from "mongoose";
const PromptSchema = new Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    required: [true, "Prompt is required"],
  },
  tag: {
    type: String,
    required: [true, "Tag is required"],
  },
});
// let Prompt = undefined;
// if (!models.Prompt) {
//   // Create the Prompt model
//   Prompt = model("Prompt", PromptSchema);
// }
console.log(models);
const Prompt = models.Prompt || model("Prompt", PromptSchema);
// export default Prompt === undefined ? models.Prompt : Prompt;
export default Prompt;
