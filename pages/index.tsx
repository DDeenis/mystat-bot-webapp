import type { NextPage } from "next";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [message, setMessage] = useState<string>();

  useEffect(() => {
    if (!window) return;

    fetch("./api/login", {
      // @ts-ignore
      body: JSON.stringify(window.Telegram.WebApp.initDataUnsafe.user.id),
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => setMessage(res.message));
  }, []);

  // @ts-ignore
  return <div>Hello from {message}</div>;
};

export default Home;
