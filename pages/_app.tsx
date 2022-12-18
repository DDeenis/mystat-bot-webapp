import { AppType } from "next/dist/shared/lib/utils";
import "../styles/global.css";
import { trpc } from "../utils/trpc";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className="main-container">
      <Component {...pageProps} />
    </main>
  );
};

export default trpc.withTRPC(MyApp);
