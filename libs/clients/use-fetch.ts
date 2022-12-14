import { accessTokenState } from "atoms/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import useSWR from "swr";
import { clearAccessTokenFromSession } from "./storage-helpers";
import type { ApiResponse, CoreResponse } from "types/api";

interface UseFetcherInputs {
  url: string;
}

export const useFetcher = <T>({ url }: UseFetcherInputs) => {
  const [result, setResult] = useState<ApiResponse<T> | undefined>(undefined);
  const router = useRouter();
  const setAccessToken = useSetRecoilState(accessTokenState);
  const { data, error, isValidating, mutate } = useSWR<CoreResponse<T>>([url]);

  useEffect(() => {
    if (!isValidating && data && !data?.data.ok && data.status !== 403) {
      router.replace("/invalid");
    }

    if (!isValidating && data?.status === 403) {
      clearAccessTokenFromSession();
      setAccessToken(undefined);
      router.replace("/auth/sign-in");
    }

    if (!isValidating && data?.data) {
      setResult(data.data);
    }
  }, [data, isValidating]);

  return { data: result, error, isValidating, mutate };
};
