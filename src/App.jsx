import "./index.css";
import Menu from "./screens/menu";
import NewsPart from "./screens/newsPart";
import Tweet from "./screens/tweet";

function App() {
  return (
    <>
      <div className="h-screen w-full flex">
        <Menu />

        {/* middle part main-content */}
        <Tweet />

        {/* right side news part */}
        <NewsPart />
      </div>
    </>
  );
}

export default App;
