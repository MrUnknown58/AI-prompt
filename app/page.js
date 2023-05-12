import Feed from "@components/Feed";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <section className="w-full flex flex-col items-center">
        <div className="pt-16 flex justify-center flex-col text-center space-y-8">
          <div className="md:text-5xl text-4xl font-bold text-blue-400">
            Want your AI to work Efficiently?
          </div>
          <br className="max-md:hidden" />
          <span className="md:text-3xl text-2xl font-bold">
            Use these Prompts and get all of your Answers from AI..
          </span>
          <p className="px-16 md:text-xl text-sm font-semibold bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% text-transparent bg-clip-text">
            Engage in captivating conversations and unlock the power of AI with
            AI-Prompts. From brainstorming ideas to creative content generation,
            AI-Prompts offers an interactive platform to effortlessly interact
            with the language model and tap into its limitless potential.
            Explore the art of conversation with AI and unleash your imagination
            like never before.
          </p>
        </div>
        <Feed />
      </section>
    </>
  );
}
