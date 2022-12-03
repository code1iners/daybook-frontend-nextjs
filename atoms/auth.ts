import { atom, selector } from "recoil";

export const accessTokenState = atom<string | undefined>({
  key: "accessTokenState",
  default: undefined,
});

export const isLoggedInState = selector({
  key: "isLoggedInState",
  get: ({ get }) => {
    return !!get(accessTokenState);
  },
});
