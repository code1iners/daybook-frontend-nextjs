import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { isLoggedInState } from "atoms/auth";

export const useProtect = () => {
  const router = useRouter();
  const isLoggedIn = useRecoilValue(isLoggedInState);

  useEffect(() => {
    if (isLoggedIn) router.replace("/");
  }, [isLoggedIn, router]);

  return { isLoggedIn };
};
