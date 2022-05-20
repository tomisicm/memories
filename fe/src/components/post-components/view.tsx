const ViewPost = ({
  loading,
  post,
  error,
  updateCurrentViewHandler,
}: any): JSX.Element => {
  if (loading) {
    return <div>{"loading..."}</div>;
  }

  if (error) {
    return <div>{"something went wrong"}</div>;
  }

  return (
    <div className="mx-4 my-4 border-2 border-slate-400 rounded-md">
      <div className="px-6 py-6 ">
        <h1 className="my-2 font-mono capitalize font-semibold text-xl">
          {post.title}
        </h1>

        <div className="py-4 px-6 w-96">
          <img
            className="object-contain h-48 rounded-md"
            src="https://s1.1zoom.me/b3559/165/Texture_Stones_Many_574636_600x800.jpg"
            alt="story_img"
          />
        </div>

        <div className="py-4">
          <p>{post.body}</p>
        </div>

        <div className="flex justify-end">
          <button
            className="text-base font-semibold bg-gray-800 text-white 
      rounded-lg px-6 py-1 block shadow-xl hover:text-white hover:bg-black"
            onClick={updateCurrentViewHandler}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewPost;
