import type { NextPage } from "next";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  useEffect(() => {
    // @ts-ignore
    console.log(window?.Telegram.WebApp.initDataUnsafe);
    fetch("./api/login", {
      // @ts-ignore
      body: JSON.stringify(window?.Telegram.WebApp.initDataUnsafe),
      method: "POST",
    });
  }, []);

  return <div>Hello</div>;
};

export default Home;
