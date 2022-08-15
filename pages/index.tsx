import type { NextPage } from "next";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [message, setMessage] = useState<string>();

  useEffect(() => {
    if (!window) return;

    // @ts-ignore
    console.log(window?.Telegram.WebApp.initDataUnsafe);
    fetch("./api/login", {
      // @ts-ignore
      body: JSON.stringify(window?.Telegram.WebApp.initDataUnsafe),
      method: "POST",
    });
    // .then((res) => res.json())
    // .then((res) => setMessage(res.message));
    // @ts-ignore
    setMessage(JSON.stringify(window?.Telegram.WebApp.initDataUnsafe));
  }, []);

  // @ts-ignore
  return <div>Hello from {message}</div>;
};

export default Home;
