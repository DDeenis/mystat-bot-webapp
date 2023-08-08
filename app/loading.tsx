import { LoadingRoller } from "../components/Loaders/Loaders";

export default async function LoadingPage() {
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
