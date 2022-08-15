import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
        <script
          async
          src="https://telegram.org/js/telegram-web-app.js"
        ></script>
      </body>
    </Html>
  );
}
