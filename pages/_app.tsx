import "@/styles/globals.css";
import Footer from "@/components/footer";
import Header from "@/components/header";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Header */}
      <Header />

      {/* Body */}
      <Component {...pageProps} />

      {/* Footer */}
      <Footer />
    </>
  );
}
