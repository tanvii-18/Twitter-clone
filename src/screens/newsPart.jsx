import React from "react";

const trends = [
  {
    title: "#Bollywood",
    posts: "85.2K",
    about: "Entertainment • Trending",
  },
  {
    title: "Virat Kohli",
    posts: "112K",
    about: "Cricket • Trending",
  },
  {
    title: "#IPhone16",
    posts: "198K",
    about: "Technology • Trending",
  },
  {
    title: "Elon Musk",
    posts: "92.5K",
    about: "Trending",
  },
  {
    title: "#100DaysOfCode",
    posts: "48.9K",
    about: "",
  },
];

function NewsPart() {
  return (
    <div className="hidden lg:block w-80">
      <div className="sticky top-0 bg-white">
        {/* Search Bar */}
        <div className="p-4">
          <div className="flex items-center gap-3 bg-gray-100 rounded-full px-4 py-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17 17L21 21"
                stroke="#afafaf"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z"
                stroke="#afafaf"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <input
              type="text"
              placeholder="Search Twitter"
              className="bg-transparent outline-none flex-1 text-gray-800 placeholder-gray-500 text-[14px]"
            />
          </div>
        </div>

        {/* Trends */}
        <div className="bg-gray-100 rounded-2xl mx-4 mb-4 overflow-hidden">
          <div className="px-4 py-3">
            <h3 className="text-[18px] font-bold">Trends for you</h3>
          </div>
          {trends.map((trend, index) => (
            <div
              key={index}
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer transition"
            >
              <p className="text-sm text-gray-500 text-[2px]">{trend.about}</p>
              <p className="font-semibold text-gray-900 text-[14px]">
                {trend.title}
              </p>
              <p className="text-sm text-gray-500 text-[8px]">
                {trend.posts} posts
              </p>
            </div>
          ))}
          <div className="px-4 py-3 text-blue-500 font-medium hover:bg-gray-100 cursor-pointer">
            Show more
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsPart;
