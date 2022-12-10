import Head from "next/head";
import { useRouter } from "next/router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  clearAccessTokenFromSession,
  getAccessTokenFromSession,
} from "@/libs/clients/storage-helpers";
import { accessTokenState, isLoggedInState } from "atoms/auth";
import { useEffect, useState } from "react";
import { Meta } from "@/constants/environments";

export default function Header() {
  const router = useRouter();
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const setAccessToken = useSetRecoilState(accessTokenState);
  const [metaHref, setMetaHref] = useState<string | undefined>();
  const [metaLanguage, setMetaLanguage] = useState<string | undefined>();
  const [metaTitle, setMetaTitle] = useState<string | undefined>();
  const [metaDescription, setMetaDescription] = useState<string | undefined>();

  const onSignOutClick = () => {
    clearAccessTokenFromSession();
    setAccessToken(undefined);
    router.replace("/auth/sign-in");
  };

  useEffect(() => {
    if (!isLoggedIn) {
      const accessToken = getAccessTokenFromSession();
      if (accessToken) setAccessToken("accessToken");
    }
  }, [isLoggedIn, setAccessToken]);

  useEffect(() => {
    setMetaHref(`${window.origin}${router.route}`);
    setMetaLanguage(navigator.language);
    setMetaTitle(Meta[router.route]?.title ?? "Daybook");
    setMetaDescription(
      Meta[router.route]?.description ?? "간단한 일기 애플리케이션."
    );
  }, [router.route]);

  // Handlers.
  const onLogoClick = () => {
    router.push("/");
  };

  return (
    <header>
      <Head>
        <title>Daybook</title>
        <meta name="description" content="A simple diary application." />
        <meta key="og:type" property="og:type" content="website" />
        <meta key="og:url" property="og:url" content={metaHref} />
        <meta key="og:title" property="og:title" content={metaTitle} />
        <meta
          key="og:description"
          property="og:description"
          content={metaDescription}
        />
        <meta key="og:site_name" property="og:site_name" content="Daybook" />
        <meta key="og:locale" property="og:locale" content={metaLanguage} />
        {/* 다음의 태그는 필수는 아니지만, 포함하는 것을 추천함 */}
        {/* <meta property="og:image" content="https://example.com/image.jpg" /> */}
        {/* <meta property="og:image:width" content="1200" /> */}
        {/* <meta property="og:image:height" content="630" /> */}

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="flex justify-between p-3 border-b">
        <h1
          className="select-none text-lg cursor-pointer font-semibold tracking-wider transition hover:text-indigo-500 hover:scale-110 origin-left"
          onClick={onLogoClick}
        >
          Daybook
        </h1>

        <ul className="flex items-center gap-3 capitalize text-sm">
          {isLoggedIn ? (
            <>
              <li className="cursor-pointer" onClick={onSignOutClick}>
                로그아웃
              </li>
            </>
          ) : (
            <>
              <li
                className="cursor-pointer transition hover:text-indigo-500 hover:scale-110 origin-right"
                onClick={() => router.push("/auth/sign-in")}
              >
                로그인
              </li>
              <li
                className="cursor-pointer transition hover:text-indigo-500 hover:scale-110 origin-right"
                onClick={() => router.push("/auth/sign-up")}
              >
                회원가입
              </li>
            </>
          )}
        </ul>
      </section>
    </header>
  );
}
