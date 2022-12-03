import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { axiosClient } from "@/libs/clients/axios";
import { useProtect } from "@/libs/clients/use-protect";
import { isEmailValid, isPasswordValid } from "@/libs/clients/validators";
import { Environments } from "constants/environments";
import HorizontalSimpleButton from "@/components/horizontal-simple-button";
import Input from "@/components/input";

export interface SignUpForm {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  birthday: string;
}

export default function SignUp() {
  useProtect();

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<SignUpForm>();

  const onSubmit = async (form: SignUpForm) => {
    try {
      const { data } = await axiosClient.post(
        `${Environments.BaseOrigin}/api/v1/auth/join`,
        {
          email: form.email,
          name: form.name,
          password: form.password,
          birthday: form.birthday,
        }
      );

      if (data.code !== 201) return alert(data.message);

      router.push(`/auth/sign-in?id=${form.email}`);

      // alert("회원가입이 정상적으로 처리되었습니다.");
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
        <div className="flex flex-col gap-2">
          <Input
            type="email"
            placeholder="아이디를 입력해주세요."
            register={register("email", {
              required: "아이디를 입력해주세요.",
              validate: { isEmailValid },
            })}
            errors={[
              errors.email?.message ?? "",
              errors.email?.type === "isEmailValid"
                ? "이메일 형식이 올바르지 않습니다."
                : "",
            ]}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Input
            type="text"
            placeholder="이름을 입력해주세요."
            register={register("name", {
              required: "이름을 입력해주세요.",
            })}
            errors={[errors.name?.message ?? ""]}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Input
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
          />
        </div>

        <div className="flex flex-col gap-2">
          <Input
            type="password"
            placeholder="암호 확인을 입력해주세요."
            register={register("confirmPassword", {
              required: "암호 확인을 입력해주세요.",
              validate: {
                sameAs: (confirmPassword) =>
                  confirmPassword === getValues("password"),
              },
            })}
            errors={[errors.confirmPassword?.message ?? ""]}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Input
            type="date"
            placeholder="생일을 입력해주세요."
            register={register("birthday", {
              required: "생일을 입력해주세요.",
            })}
            errors={[errors.birthday?.message ?? ""]}
          />
        </div>

        <HorizontalSimpleButton text="회원가입" />
      </form>
    </article>
  );
}
