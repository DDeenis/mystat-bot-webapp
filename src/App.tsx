import { useEffect } from "react";
import { expand, setButtonText } from "./helpers/telegram";

function App() {
  useEffect(() => {
    expand();
    setButtonText("TEST");
  }, []);

  return <div className="App"></div>;
}

export default App;
