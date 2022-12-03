import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { AxiosHeaders } from "axios";
import { SWRConfig } from "swr";
import { axiosClient } from "@/libs/clients/axios";
import "@/styles/globals.css";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Body from "@/components/body";

export interface ApiResponse<T> {
  ok: boolean;
  code: number;
  data: T;
  message?: string;
}

export interface CoreResponse<T> {
  data: ApiResponse<T>;
  config: any;
  headers: AxiosHeaders;
  request: XMLHttpRequest;
  status: number;
  statusText: string;
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <SWRConfig
        value={{
          fetcher: (url) => axiosClient.get(url),
        }}
      >
        <div className="h-screen flex flex-col">
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
