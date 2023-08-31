import React from "react";
import { BackButton } from "../../components/BackButton/BackButton";
import { UserProfile } from "../../components/UserProfile/UserProfile";
import { getFullProfileInfo } from "../../server/actions";

export default async function UserInfoPage() {
  const profileInfo = await getFullProfileInfo();

  return (
    <>
      <BackButton />
      {profileInfo ? (
        <UserProfile profileInfo={profileInfo} />
      ) : (
        <div style={{ textAlign: "center" }}>
          Не удалось загрузить данные профиля
        </div>
      )}
    </>
  );
}
