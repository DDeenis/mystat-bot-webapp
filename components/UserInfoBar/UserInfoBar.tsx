import Image from "next/image";
import React from "react";
import { IconCoin, IconGem } from "../Icons/Icons";
import styles from "./UserInfoBar.module.css";

type Props = {
  userInfo: any;
};

export const UserInfoBar = ({ userInfo }: Props) => {
  const userName = userInfo.full_name.split(" ").slice(0, 2).join(" ");
  const [gems, coins] = userInfo.gaming_points;

  return (
    <div className={styles.container}>
      <div className={styles.dataContainer}>
        <Image
          src={userInfo.photo}
          alt={userInfo.full_name}
          width={25}
          height={25}
          objectFit={"cover"}
          className={styles.avatar}
          unoptimized
        />
        <span className={styles.userName}>{userName}</span>
      </div>
      <div className={styles.dataContainer}>
        <div className={styles.pointsInfo}>
          <IconGem />
          <span>{gems.points}</span>
        </div>
        <div className={styles.pointsInfo}>
          <IconCoin />
          <span>{coins.points}</span>
        </div>
      </div>
    </div>
  );
};
