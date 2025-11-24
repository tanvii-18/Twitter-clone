import "./index.css";
import Menu from "./screens/menu";

function App() {
  return (
    <>
      <div className="h-screen w-full flex">
        <Menu />

        {/* middle part main-content */}
        <div className="h-auto w-150"></div>

        {/* right side news part */}
        <div className="h-screen w-80 border-l border-gray-400"></div>
      </div>
    </>
  );
}

export default App;
