import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon-light.svg" sizes="any" media="(prefers-color-scheme: light)" />
        <link rel="icon" href="/favicon-dark.svg" sizes="any" media="(prefers-color-scheme: dark)" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
