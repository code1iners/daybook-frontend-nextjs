import { CoreResponse } from "@/pages/_app";
import { accessTokenState } from "atoms/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import useSWR from "swr";
import { clearAccessTokenFromSession } from "./storage-helpers";

interface UseFetcherInputs {
  url: string;
}

export const useFetcher = <T>({ url }: UseFetcherInputs) => {
  const router = useRouter();
  const setAccessToken = useSetRecoilState(accessTokenState);
  const { data, error, isValidating, mutate } = useSWR<CoreResponse<T>>([url]);

  useEffect(() => {
    if (data?.status === 403) {
      clearAccessTokenFromSession();
      setAccessToken(undefined);
      router.replace("/auth/sign-in");
    }
  }, [data]);

  return { data, error, isValidating, mutate };
};
