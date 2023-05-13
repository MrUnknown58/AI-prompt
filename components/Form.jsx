import { useRouter } from "next/navigation";
const Form = (props) => {
  const { type, post, setpost, submitting, handleSubmit } = props;
  const router = useRouter();
  return (
    <>
      <section className="w-full max-w-full px-5 flex flex-col items-center">
        <h1 className="text-2xl font-semibold flex justify-start bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          {type} Post
        </h1>
        <p className="md:px-52 pt-7 text-normal font-semibold bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% text-transparent bg-clip-text">
          Engage in captivating conversations and unlock the power of AI with
          AI-Prompts. From brainstorming ideas to creative content generation,
          AI-Prompts offers an interactive platform to effortlessly interact
          with the language model and tap into its limitless potential. Explore
          the art of conversation with AI and unleash your imagination like
          never before.
        </p>
        <form
          className="mt-10 w-full max-w-3xl p-5 flex flex-col rounded-xl border border-gray-200 bg-white/20 shadow-[inset_10px  _-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur space-y-5"
          onSubmit={handleSubmit}
        >
          {/* <div className="rounded-xl border border-gray-200 bg-white/20 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur p-5 flex flex-col space-y-5"> */}
          <div className="flex flex-col space-y-3">
            <label className="">Add your Prompt</label>
            <textarea
              className="md:w-2/3 border border-black min-h-[6rem] p-2"
              placeholder="Write your Prompt here"
              value={post.prompt}
              onChange={(e) => {
                setpost({ ...post, prompt: e.target.value });
              }}
            ></textarea>
          </div>
          <div className="flex flex-col space-y-3">
            <label className="">Tag</label>
            <textarea
              className="md:w-2/3 border border-black min-h-[6rem] p-2"
              placeholder="Add your Tag..."
              value={post.tag}
              onChange={(e) => {
                setpost({ ...post, tag: e.target.value });
              }}
            ></textarea>
          </div>
          <div className="flex justify-center space-x-5">
            <button
              type="button"
              className="rounded-full border border-black py-2 px-5 text-black hover:bg-black hover:text-white text-sm flex flex-col justify-center transition-all z"
              onClick={() => router.push("/")}
            >
              Cancel
            </button>
            <button
              disabled={submitting}
              type="submit"
              className="rounded-full border border-black py-2 px-5 text-black hover:bg-black hover:text-white text-sm flex flex-col justify-center transition-all"
            >
              {type}
              {submitting ? "ing..." : ""}
            </button>
          </div>
          {/* </div> */}
        </form>
      </section>
    </>
  );
};

export default Form;
