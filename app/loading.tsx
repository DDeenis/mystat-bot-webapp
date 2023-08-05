// import { LoadingState } from "../components/PageStates/PageStates";

import { LoadingRoller } from "../components/Loaders/Loaders";

export default async function LoadingPage() {
  // return <LoadingState visible={true} />;
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LoadingRoller />
    </div>
  );
}
