import { useState } from "react";
import "./App.css";
import Extension from "./Components/Extension";

function App() {
  const [genAiBookmarkInfo, setGenAiBookmarkInfo] = useState("");

  return (
    <>
      <Extension
        genAiBookmarkInfo={genAiBookmarkInfo}
        setGenAiBookmarkInfo={setGenAiBookmarkInfo}
      />
    </>
  );
}

export default App;
