import clsx from "clsx";
import React from "react";
import {
  applyTheme,
  setLocalTheme,
  Theme,
  ThemeInfo,
} from "../../utils/themes";
import { EmptyState, LoadingState } from "../PageStates/PageStates";
import { Tabs } from "../Tabs/Tabs";
import styles from "./Settings.module.css";

type Props = {
  themes?: ThemeInfo[];
  isLoading: boolean;
};

export const Settings = ({ themes, isLoading }: Props) => {
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
      <div className={styles.appInfo}>
        <p className={styles.title}>Темы</p>
        <Tabs list={["Выбрать тему", "Создать тему"]}>
          <div className={styles.themesGrid}>
            <div className={styles.themeEntry_state}>
              <LoadingState visible={isLoading} />
              <EmptyState visible={themes?.length === 0 && !isLoading}>
                Нет тем
              </EmptyState>
            </div>
            {themes !== undefined &&
              themes.map((t, i) => <ThemeEntry themeInfo={t} key={i} />)}
          </div>
          <div>WIP</div>
        </Tabs>
      </div>
    </div>
  );
};

interface ThemeEntryProps {
  themeInfo: ThemeInfo;
  isCurrent?: boolean;
}

const ThemeEntry = ({ themeInfo, isCurrent }: ThemeEntryProps) => {
  const apply = () => {
    applyTheme(themeInfo.theme);
    setLocalTheme(themeInfo.id);
  };

  return (
    <button
      className={clsx(
        styles.themeEntry,
        isCurrent && styles.themeEntry_current
      )}
      onClick={apply}
    >
      <div
        className={styles.themeEntryColor}
        style={{ backgroundColor: `rgb(${themeInfo.theme.primary})` }}
      />
      <div
        className={styles.themeEntryColor}
        style={{ backgroundColor: `rgb(${themeInfo.theme.secondary})` }}
      />
      <div
        className={styles.themeEntryColor}
        style={{ backgroundColor: `rgb(${themeInfo.theme.tertiary})` }}
      />
      <div
        className={styles.themeEntryColor}
        style={{ backgroundColor: `rgb(${themeInfo.theme.quaternary})` }}
      />
      <div
        className={styles.themeEntryColor}
        style={{ backgroundColor: `rgb(${themeInfo.theme.quinary})` }}
      />
    </button>
  );
};
