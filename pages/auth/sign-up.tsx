import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { axiosClient } from "@/libs/clients/axios";
import { useProtect } from "@/libs/clients/use-protect";
import {
  isEmailValid,
  isPasswordValid,
  isFuture,
} from "@/libs/clients/validators";
import { Environments } from "constants/environments";
import HorizontalSimpleButton from "@/components/horizontal-simple-button";
import Input from "@/components/input";
import { createNotification } from "@/libs/clients/notification-helpers";

export interface SignUpForm {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  birthdate: string;
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
          birthdate: form.birthdate,
        }
      );

      if (data.code !== 200) return createNotification(data.message);

      createNotification("회원가입이 정상적으로 처리되었습니다.");

      router.replace(`/auth/sign-in?email=${form.email}`);
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
            htmlId="input-email"
            type="email"
            placeholder="이메일를 입력해주세요."
            register={register("email", {
              required: "이메일를 입력해주세요.",
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
        </div>

        <div className="flex flex-col gap-2">
          <Input
            htmlId="input-name"
            type="text"
            placeholder="이름을 입력해주세요."
            register={register("name", {
              required: "이름을 입력해주세요.",
            })}
            errors={[errors.name?.message ?? ""]}
          >
            <label className="input-label" htmlFor="input-name">
              name
            </label>
          </Input>
        </div>

        <div className="flex flex-col gap-2">
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
        </div>

        <div className="flex flex-col gap-2">
          <Input
            htmlId="input-confirm-password"
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
          >
            <label className="input-label" htmlFor="input-confirm-password">
              confirm password
            </label>
          </Input>
        </div>

        <div className="flex flex-col gap-2">
          <Input
            htmlId="input-birthdate"
            type="date"
            placeholder="생년월일을 입력해주세요."
            register={register("birthdate", {
              required: "생년월일을 입력해주세요.",
              validate: {
                isFuture,
              },
            })}
            errors={[
              errors.birthdate?.message ?? "",
              errors.birthdate?.type === "isFuture"
                ? "생년월일은 미래가 될 수 없습니다."
                : "",
            ]}
          >
            <label className="input-label" htmlFor="input-birthdate">
              Birthday
            </label>
          </Input>
        </div>

        <HorizontalSimpleButton text="회원가입" />
      </form>
    </article>
  );
}
