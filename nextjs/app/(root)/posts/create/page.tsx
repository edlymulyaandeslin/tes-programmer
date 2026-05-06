'use client';

const Create = () => {
  return (
    <>
      <div className="space-y-4 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-10">Create New Post</h1>

        <form
          action=""
          className="w-full max-w-3xl flex flex-col items-center justify-center space-y-1"
        >
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">Title</legend>
            <input
              type="text"
              className="input w-full"
              placeholder="Type here"
            />
          </fieldset>

          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">Description</legend>
            <textarea
              className="textarea h-24 w-full"
              placeholder="Description"
            ></textarea>
          </fieldset>

          <div className="flex justify-end w-full mt-2">
            <button className="btn btn-primary" onClick={() => {}}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Create;
