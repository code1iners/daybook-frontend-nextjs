import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { axiosClient } from "@/libs/clients/axios";
import { isEmailValid, isPasswordValid } from "@/libs/clients/validators";
import { setAccessTokenIntoSession } from "@/libs/clients/storage-helpers";
import HorizontalSimpleButton from "@/components/horizontal-simple-button";
import Input from "@/components/input";
import { Environments } from "constants/environments";
import { accessTokenState } from "atoms/auth";

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

  const onSubmit = async (form: SignInForm) => {
    try {
      const { data } = await axiosClient.post(
        `${Environments.BaseOrigin}/api/v1/auth/login`,
        form
      );

      if (data.code !== 200) return alert(data.message);

      // Store access token into session storage.
      if (!data.data.token) return alert("토큰을 찾을 수 없습니다.");

      setAccessTokenIntoSession(data.data.token);

      setAccessToken(data.data.token);

      router.replace("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <article className="p-10">
      <form
        className="flex flex-col space-y-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          type="text"
          placeholder="아이디를 입력해주세요."
          register={register("email", {
            required: "아이디를 입력해주세요.",
            validate: { isEmailValid },
          })}
          errors={[errors.email?.message ?? ""]}
        />

        <Input
          type="password"
          placeholder="암호를 입력해주세요."
          register={register("password", {
            required: "암호를 입력해주세요.",
            validate: { isPasswordValid },
          })}
          errors={[errors.password?.message ?? ""]}
        />

        <HorizontalSimpleButton text="로그인" />
      </form>
    </article>
  );
}
