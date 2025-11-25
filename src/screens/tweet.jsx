import { useEffect, useState } from "react";
import "../index.css";

function Tweet() {
  const [tweets, setTweets] = useState([]);
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTweets = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/tweets");
      const data = await res.json();
      setTweets(data);
      console.log(data);
    } catch (err) {
      console.error("Failed to fetch tweets", err);
    }
  };

  useEffect(() => {
    fetchTweets();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!content.trim()) {
      setError("Please write something!");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:4000/api/tweets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, author: author || "anonymous" }),
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.err || "Failed to post tweet");
        setLoading(false);
        return;
      }

      const newTweet = await res.json();
      setTweets([newTweet, ...tweets]);
      setContent("");
      setAuthor("");
      setLoading(false);
    } catch (err) {
      setError("Network error.");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this tweet?")) return;

    try {
      await fetch(`http://localhost:4000/api/tweets/${id}`, {
        method: "DELETE",
      });
      setTweets(tweets.filter((t) => t.id !== id));
    } catch (err) {
      alert("Failed to delete");
    }
  };

  return (
    <div className="bg-gray-100">
      <div className="h-auto w-150">
        {/* input part */}

        <div className="rounded-xl px-4 py-2 m-2 bg-white">
          <div className="py-2 ">
            <h2 className="font-bold py-2 border-b border-gray-300">Home</h2>
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => setAuthor(e.target.value)}
              className=" outline-none border-none py-2"
            />
          </div>
          <div className="flex justify-between">
            <div className="py-4 flex gap-3 text-[14px]">
              <img
                src="https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fHww"
                alt=""
                className="h-12 w-12 object-cover rounded-full"
              />
              <textarea
                type="text"
                placeholder="What's happening?"
                onChange={(e) => setContent(e.target.value)}
                className=" outline-none border-none"
              />
            </div>
            <div>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              <span className="text-sm text-gray-500 pr-3">
                {content.length}/280
              </span>
              <button
                type="submit"
                onClick={handleSubmit}
                className="py-2 px-5 border rounded-full bg-[#00A1F6] text-white my-5 cursor-pointer hover:bg-[#009aed] "
              >
                Tweet
              </button>
            </div>
          </div>
        </div>

        {/* display part */}

        <div className="rounded-xl px-4 py-2 m-2">
          {tweets.length === 0 ? (
            <p className="text-center text-gray-500 py-20 text-lg">
              No tweets yet. Be the first to post!
            </p>
          ) : (
            tweets.map((tweet) => (
              <div
                key={tweet.id}
                className="px-4 py-4 hover:bg-gray-50 transition flex gap-4 rounded-xl m-2 bg-white"
              >
                <img
                  src=""
                  alt={tweet.author}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <strong className="font-bold">{tweet.author}</strong>
                    <span className="text-gray-400 text-[10px]">
                      {new Date(tweet.createdAt).toLocaleString()}
                    </span>
                    {tweet.edited && (
                      <span className="text-gray-400 text-xs">(edited)</span>
                    )}
                  </div>
                  <div className="flex justify-between">
                    <p className="mt-1 text-[16px] whitespace-pre-wrap">
                      {tweet.content}
                    </p>
                    <button
                      onClick={() => handleDelete(tweet.id)}
                      className="mt-3 text-red-500 text-sm"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5"
                          stroke="#ba0b2e"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                        <path
                          d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5"
                          stroke="#ba0b2e"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Tweet;
