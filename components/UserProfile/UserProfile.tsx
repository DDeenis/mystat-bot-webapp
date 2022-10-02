import Image from "next/image";
import React from "react";
import { IconCoin, IconGem, IconStar } from "../Icons/Icons";
import { InfoCard } from "../InfoCard/InfoCard";
import styles from "./UserProfile.module.css";

type Props = {
  profileInfo: any;
};

export const UserProfile = ({ profileInfo }: Props) => {
  const [gems, coins] = profileInfo.gaming_points;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Image
          src={profileInfo.photo}
          alt={profileInfo.full_name}
          width={150}
          height={150}
          objectFit={"cover"}
          className={styles.avatar}
          unoptimized
        />
        <p className={styles.name}>{profileInfo.full_name}</p>
      </div>
      <InfoCard ghost>
        <InfoCard.Element>
          <Entry title="Поинты">
            <div className={styles.pointsInfoContainer}>
              <div className={styles.pointsInfo}>
                <IconGem />
                <span>{gems.points}</span>
              </div>
              <div className={styles.pointsInfo}>
                <IconCoin />
                <span>{coins.points}</span>
              </div>
              <div className={styles.pointsInfo}>
                <IconStar />
                <span>{gems.points + coins.points}</span>
              </div>
            </div>
          </Entry>
        </InfoCard.Element>
        <InfoCard.Row>
          <InfoCard.Cell>
            <Entry title="Группа">{profileInfo.group_name}</Entry>
          </InfoCard.Cell>
          <InfoCard.Cell>
            <Entry title="Поток">{profileInfo.stream_name}</Entry>
          </InfoCard.Cell>
        </InfoCard.Row>
        <InfoCard.Row>
          <InfoCard.Cell>
            <Entry title="Количество достижений">
              {profileInfo.achieves_count}
            </Entry>
          </InfoCard.Cell>
          <InfoCard.Cell>
            <Entry title="Уровень профиля">{profileInfo.level}</Entry>
          </InfoCard.Cell>
        </InfoCard.Row>
        <InfoCard.Row>
          <InfoCard.Cell>
            <Entry title="Почта">{profileInfo.email}</Entry>
          </InfoCard.Cell>
          <InfoCard.Cell>
            <Entry title="Телефон">
              {profileInfo.phones?.[0]?.phone_number}
            </Entry>
          </InfoCard.Cell>
        </InfoCard.Row>
        {profileInfo.azure.has_azure && (
          <InfoCard.Element>
            <Entry title="Почта в Azure">{profileInfo.azure.login}</Entry>
          </InfoCard.Element>
        )}
      </InfoCard>
    </div>
  );
};

interface EntryProps {
  title: string;
  children: React.ReactNode;
}

const Entry = ({ title, children }: EntryProps) => {
  return (
    <div className={styles.entry}>
      <p className={styles.entryTitle}>{title}</p>
      <div className={styles.entryValue}>{children}</div>
    </div>
  );
};
