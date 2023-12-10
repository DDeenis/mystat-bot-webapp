import { Roboto } from "next/font/google";
import Script from "next/script";
import "../styles/global.css";
import { Suspense } from "react";
import { PHProvider, PostHogPageview } from "./providers";

// If loading a variable font, you don't need to specify the font weight
const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["cyrillic"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={roboto.className}>
      <Script src="https://telegram.org/js/telegram-web-app.js" />
      <Suspense>
        <PostHogPageview />
      </Suspense>
      <PHProvider>
        <body>
          <main className="main-container">{children}</main>
        </body>
      </PHProvider>
    </html>
  );
}
