import { UserInfoBar } from "../../components/UserInfoBar/UserInfoBar";
import { getProfile } from "../../server/actions";
import PostHogClient from "../../utils/posthogNode";

export default async function Home() {
  const profile = await getProfile();

  if (profile) {
    const client = PostHogClient();
    client.capture({
      distinctId: profile.student_id.toString(),
      event: "user loaded profile",
      properties: {
        $set: { group: profile.group_name, stream: profile.stream_name },
      },
    });
    await client.shutdownAsync();
  }

  return profile ? <UserInfoBar userInfo={profile} /> : null;
}
