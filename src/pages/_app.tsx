import type { AppProps } from "next/app";
import { BasketContextProvider } from "../contexts/basketContext";

import "../global.css";

const QogitaApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <BasketContextProvider>
      <Component {...pageProps} />
    </BasketContextProvider>
  );
};

export default QogitaApp;
