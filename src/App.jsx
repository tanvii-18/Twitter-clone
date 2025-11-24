import "./index.css";

function App() {
  return (
    <>
      <div className="h-screen w-full flex">
        {/* left side menu part */}
        <div className="h-screen w-80 border-r border-gray-400">
          <div>
            <div className="logo">
              <img src="" alt="" />
            </div>
            <ul>
              <li>
                <a href="">Home</a>
              </li>
              <li>
                <a href="">Explore</a>
              </li>
              <li>
                <a href="">Notifications</a>
              </li>
              <li>
                <a href="">Messages</a>
              </li>
              <li>
                <a href="">Bookmarks</a>
              </li>
              <li>
                <a href="">Lists</a>
              </li>
              <li>
                <a href="">Profile</a>
              </li>
              <li>
                <a href="">More</a>
              </li>
            </ul>
          </div>
        </div>

        {/* middle part main-content */}
        <div className="h-auto w-150"></div>

        {/* right side news part */}
        <div className="h-screen w-80 border-l border-gray-400"></div>
      </div>
    </>
  );
}

export default App;
