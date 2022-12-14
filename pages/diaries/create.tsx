// Request Body
// {
//     ""year"" : ""2022"",
//     ""month"" : ""12"",
//     ""day"" : ""05"",
//     ""content"" : ""일기 테스트~~""
// }

import HorizontalSimpleButton from "@/components/horizontal-simple-button";
import { axiosClient } from "@/libs/clients/axios";
import { createNotification } from "@/libs/clients/notification-helpers";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { ApiResponse } from "types/api";

export interface CreateDiaryForm {
  content: string;
}

export interface CreateDiaryResponse extends ApiResponse {}

export default function CreateDiary() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateDiaryForm>();

  const onSubmitValid = async ({ content }: CreateDiaryForm) => {
    try {
      const now = new Date();
      const year = router.query.year ?? now.getFullYear();
      const month =
        router.query.month ?? (now.getMonth() + 1).toString().padStart(2, "0");
      const day = router.query.day ?? now.getDate();

      const { data } = await axiosClient.post<CreateDiaryResponse>(
        "/api/v1/diaries",
        {
          year,
          month,
          day,
          content,
        }
      );
      if (!data.ok || data.code !== 200)
        createNotification(data.message ?? "일기 작성을 실패했습니다.");

      createNotification(data.message ?? "일기 작성을 성공했습니다.");

      router.back();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <article className="h-full flex flex-col items-center p-10">
      <form
        className="w-full flex flex-col gap-5"
        onSubmit={handleSubmit(onSubmitValid)}
      >
        <div>
          <textarea
            className="w-full h-72 border rounded-md p-5 outline-indigo-500"
            placeholder="내용을 입력해주세요."
            spellCheck={false}
            {...register("content", { required: "내용을 입력해주세요." })}
          />
          <span className="error-text">{errors.content?.message}</span>
        </div>
        <HorizontalSimpleButton text="저장">
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
              d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75"
            />
          </svg>
        </HorizontalSimpleButton>
      </form>
    </article>
  );
}
