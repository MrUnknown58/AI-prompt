import PromptCart from "./PromptCart";

const Profile = ({ name, desc, posts, handleEdit, handleDelete }) => {
  const handleTagClick = () => {};
  // const handleDelete = () => {};
  return (
    <>
      <section className="w-full">
        <h1 className="space-y-5 mt-5 text-3xl  font-extrabold leading-[1.15] text-black text-left px-10">
          <span className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% text-transparent bg-clip-text py-5">
            {name} Profile
          </span>
          <p className="block w-full rounded-md border border-gray-200 bg-white py-2.5 font-satoshi pl-5 pr-12 text-sm shadow-lg font-medium focus:border-black focus:outline-none focus:ring-0 text-left">
            {desc}
          </p>
        </h1>
        <div className="py-8 grid md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 mt-[1.5rem] px-5">
          {posts.map((post, index) => {
            return (
              <PromptCart
                post={post}
                key={post.id}
                handleEdit={() => {
                  handleEdit && handleEdit(post);
                }}
                handleDelete={() => {
                  handleDelete && handleDelete(post);
                }}
              />
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Profile;
