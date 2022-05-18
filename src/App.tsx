import { useEffect } from "react";
import { expand, setButtonText } from "./helpers/telegram";
import "./App.css";

function App() {
  useEffect(() => {
    // expand();
    setButtonText("TEST");
  }, []);

  return (
    <div className="main-container">
      <h1>TEST</h1>
    </div>
  );
}

export default App;
