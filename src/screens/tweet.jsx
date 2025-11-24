import "../index.css";

function Tweet() {
  return (
    <div className="bg-gray-100">
      <div className="h-auto w-150">
        {/* input part */}

        <div className="rounded-xl px-4 py-2 m-2 bg-white">
          <div className="py-2 border-b border-gray-300">
            <h2 className="font-bold">Home</h2>
          </div>
          <div className="flex justify-between">
            <div className="py-4 flex gap-3">
              <img
                src="https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fHww"
                alt=""
                className="h-12 w-12 object-cover rounded-full"
              />
              <input type="text" placeholder="What's happening?" />
            </div>
            <button className="py-2 px-5 border rounded-full bg-[#00A1F6] text-white my-5 cursor-pointer hover:bg-[#009aed] ">
              Tweet
            </button>
          </div>
        </div>

        {/* display part */}
      </div>
    </div>
  );
}

export default Tweet;
