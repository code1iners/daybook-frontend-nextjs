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
    <header className="fixed top-0 left-0 z-50 w-full h-[65px] bg-white">
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

      <section className="h-full flex items-center justify-between p-3 border-b">
        <h1
          className="select-none text-lg cursor-pointer font-semibold tracking-wider transition hover:text-indigo-500 hover:scale-105 origin-left"
          onClick={onLogoClick}
        >
          Daybook
        </h1>

        <ul className="flex items-center gap-3 capitalize text-xs">
          {isLoggedIn ? (
            <>
              <li
                className="cursor-pointer flex items-center gap-1 transition hover:text-indigo-500 hover:scale-105 origin-right"
                onClick={onSignOutClick}
                title="로그아웃"
              >
                <span className="tracking-tighter">로그아웃</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                  />
                </svg>
              </li>
            </>
          ) : (
            <>
              <li
                className="cursor-pointer flex items-center gap-1 transition hover:text-indigo-500 hover:scale-105 origin-right"
                onClick={() => router.push("/auth/sign-in")}
                title="로그인"
              >
                <span className="tracking-tighter">로그인</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                  />
                </svg>
              </li>
              <li
                className="cursor-pointer flex items-center gap-1 transition hover:text-indigo-500 hover:scale-105 origin-right"
                onClick={() => router.push("/auth/sign-up")}
                title="회원가입"
              >
                <span className="tracking-tighter">회원가입</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                  />
                </svg>
              </li>
            </>
          )}
        </ul>
      </section>
    </header>
  );
}
