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
    <div className="h-auto bg-gray-100">
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
                className="w-80 outline-none border-none content-center"
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
        <div className="h-auto w-auto"></div>
      </div>
    </div>
  );
}

export default Tweet;
