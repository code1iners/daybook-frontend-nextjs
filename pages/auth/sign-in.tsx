import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { accessTokenState } from "@/atoms/auth";
import { axiosClient } from "@/libs/clients/axios";
import { isEmailValid, isPasswordValid } from "@/libs/clients/validators";
import { setAccessTokenIntoSession } from "@/libs/clients/storage-helpers";
import { useProtect } from "@/libs/clients/use-protect";
import { Environments } from "constants/environments";
import HorizontalSimpleButton from "@/components/horizontal-simple-button";
import Input from "@/components/input";
import { createNotification } from "@/libs/clients/notification-helpers";

interface SignInForm {
  email: string;
  password: string;
}

export default function SignIn() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>();
  const setAccessToken = useSetRecoilState(accessTokenState);
  useProtect();

  const onSubmit = async (form: SignInForm) => {
    try {
      const { data } = await axiosClient.post(
        `${Environments.BaseOrigin}/api/v1/auth/login`,
        form
      );

      if (data.code !== 200) return createNotification(data.message);

      // Store access token into session storage.
      if (!data.data.token)
        return createNotification("토큰을 찾을 수 없습니다.");

      setAccessTokenIntoSession(data.data.token);

      setAccessToken(data.data.token);

      router.replace("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <article className="p-10 flex flex-col items-center">
      <form
        className="w-full sm:w-2/3 md:w-1/2 lg:w-2/5 flex flex-col space-y-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          htmlId="input-email"
          type="email"
          placeholder="이메일을 입력해주세요."
          register={register("email", {
            required: "이메일을 입력해주세요.",
            validate: { isEmailValid },
          })}
          errors={[
            errors.email?.message ?? "",
            errors.email?.type === "isEmailValid"
              ? "이메일 형식이 올바르지 않습니다."
              : "",
          ]}
        >
          <label className="input-label" htmlFor="input-email">
            email
          </label>
        </Input>

        <Input
          htmlId="input-password"
          type="password"
          placeholder="암호를 입력해주세요."
          register={register("password", {
            required: "암호를 입력해주세요.",
            validate: { isPasswordValid },
          })}
          errors={[
            errors.password?.message ?? "",
            errors.password?.type === "isPasswordValid"
              ? "암호는 최소 8자리, 숫자, 대/소문자, 특수문자가 포함되어야 합니다."
              : "",
          ]}
        >
          <label className="input-label" htmlFor="input-password">
            password
          </label>
        </Input>

        <HorizontalSimpleButton text="로그인" />
      </form>
    </article>
  );
}
