import { UserInfoBar } from "../../components/UserInfoBar/UserInfoBar";
import { getProfile } from "../../server/actions";

export default async function Home() {
  const profile = await getProfile();

  return profile ? <UserInfoBar userInfo={profile} /> : null;
}
