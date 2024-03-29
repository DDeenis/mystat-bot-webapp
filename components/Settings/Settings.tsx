import React from "react";
import styles from "./Settings.module.css";

export const Settings = () => {
  return (
    <div className={styles.container}>
      <div className={styles.appInfo}>
        <p className={styles.title}>О сайте</p>
        <p className={styles.info}>
          Веб версия телеграм бота, что-то вроде lite версии майстата
          <br />
          <br />
          Github (бот):{" "}
          <a
            href="https://github.com/DDeenis/mystat-bot-ts"
            target={"_blank"}
            rel={"noreferrer"}
          >
            https://github.com/DDeenis/mystat-bot-ts
          </a>
          <br />
          Github (сайт):{" "}
          <a
            href="https://github.com/DDeenis/mystat-bot-webapp"
            target={"_blank"}
            rel={"noreferrer"}
          >
            https://github.com/DDeenis/mystat-bot-webapp
          </a>
          <br />
          По вопросам писать{" "}
          <a href="https://t.me/ddeenis" target={"_blank"} rel={"noreferrer"}>
            @ddeenis
          </a>{" "}
          или{" "}
          <a
            href="https://t.me/BeloMaximka"
            target={"_blank"}
            rel={"noreferrer"}
          >
            @BeloMaximka
          </a>
        </p>
      </div>
    </div>
  );
};
