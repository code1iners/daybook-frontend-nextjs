export const Environments = {
  BaseOrigin: process.env.NEXT_PUBLIC_BASE_ORIGIN,
} as const;

export const Meta = {
  "/": {
    title: "메인 페이지",
    description: "간단하게 일기를 작성해보세요!",
  },
  "/auth/sign-in": {
    title: "로그인 페이지",
    description: "로그인을 완료하고 일기를 작성해보세요!",
  },
  "/auth/sign-up": {
    title: "회원가입 페이지",
    description: "회원가입을 완료하고 일기를 작성해보세요!",
  },
} as const;
