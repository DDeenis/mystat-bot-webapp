import React, { Children, useState } from "react";
import { Multiselect } from "../Multiselect/Multiselect";
import styles from "./Tabs.module.css";

type Props = {
  list: string[];
  selectedTabIndex?: number;
  children: React.ReactNode;
};

export const Tabs = ({ list, selectedTabIndex, children }: Props) => {
  const [currentTab, setCurrentTab] = useState(selectedTabIndex ?? 0);
  const childrenArray = Children.toArray(children);
  const listVariants = list.map((tab, i) => ({ title: tab, value: i }));

  if (list.length !== childrenArray.length) {
    throw new Error(
      `Specified ${list.length} tabs, but got ${childrenArray.length}`
    );
  }

  return (
    <div className={styles.container}>
      <Multiselect
        variants={listVariants}
        onSelect={setCurrentTab}
        variantsAsTabs
      />
      <div className={styles.tabContainer}>{childrenArray[currentTab]}</div>
    </div>
  );
};
