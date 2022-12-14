import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { SWRConfig } from "swr";
import { axiosClient } from "@/libs/clients/axios";
import "@/styles/globals.css";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Body from "@/components/body";
import useNotification from "@/libs/clients/notification-helpers";

export default function App({ Component, pageProps }: AppProps) {
  useNotification();

  return (
    <RecoilRoot>
      <SWRConfig
        value={{
          fetcher: (url) => axiosClient.get(url),
        }}
      >
        <div className="h-screen flex flex-col font-gamja">
          {/* Header */}
          <Header />

          {/* Body */}
          <Body>
            <Component {...pageProps} />
          </Body>

          {/* Footer */}
          <Footer />
        </div>
      </SWRConfig>
    </RecoilRoot>
  );
}
