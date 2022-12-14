import { useRouter } from "next/router";
import { useFetcher } from "@/libs/clients/use-fetch";
import Link from "next/link";
import { createNotification } from "@/libs/clients/notification-helpers";

export interface RetrieveDiaryItem {
  diaryId: number;
  userId: number;
  content: string;
  year: string;
  month: string;
  day: string;
  registerDate: string;
}

export default function RetrieveDiary() {
  const router = useRouter();
  const params = new URLSearchParams();
  params.append("year", router.query.year + "");
  params.append("month", router.query.month + "");
  params.append("day", router.query.day + "");
  console.log(params.toString());
  const { data } = useFetcher<RetrieveDiaryItem[]>({
    url: `/api/v1/diaries/retrieve?${params.toString()}`,
  });

  if (data && !data.ok && data.code !== 200) {
    createNotification(data.message ?? "일기 조회를 실패했습니다.");
  }

  const convertTime = (stringDate: string) => {
    try {
      const date = new Date(stringDate);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const hour = date.getHours().toString().padStart(2, "0");
      const minute = date.getMinutes().toString().padStart(2, "0");
      const second = date.getSeconds().toString().padStart(2, "0");

      return `${year}-${month}-${day}, ${hour}:${minute}:${second}`;
    } catch (err) {
      console.error(err);
      return stringDate;
    }
  };

  const onCopyClick = async (diary: RetrieveDiaryItem) => {
    const date = convertTime(diary.registerDate);
    const text = `${date}\n${diary.content}`;

    // note: Copy text into clipboard.
    await navigator.clipboard.writeText(text);
    createNotification("정상적으로 클립보드에 복사되었습니다.");
  };

  const onDeleteClick = (diary: RetrieveDiaryItem) => {
    createNotification("서비스 준비중입니다.");
  };

  return (
    <article className="h-full flex flex-col items-center gap-10 p-10">
      <Link
        className="text-indigo-400 hover:text-indigo-500 underline underline-offset-4 text-base transition hover:scale-105"
        href={`/diaries/create?${params.toString()}`}
      >
        Create a new diary?
      </Link>

      {data?.data?.length ? (
        <ul className="w-full grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data?.data.map((diary) => (
            <li
              key={diary.diaryId}
              className="border rounded-md shadow-md whitespace-pre-line divide-y tracking-wider"
            >
              <div className="px-5 py-2 flex items-center justify-between">
                <small className="text-gray-500 text-xs transition-colors hover:text-indigo-500 cursor-default">
                  {convertTime(diary.registerDate)}
                </small>

                {/* Interactions */}
                <ul className="flex items-center gap-2">
                  <li
                    className="cursor-pointer transition hover:scale-105 hover:text-red-500"
                    onClick={() => onCopyClick(diary)}
                  >
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
                        d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                      />
                    </svg>
                  </li>
                  <li
                    className="cursor-pointer transition hover:scale-105 hover:text-red-500"
                    onClick={() => onDeleteClick(diary)}
                  >
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
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </li>
                </ul>
              </div>
              <p
                className="p-5 text-base"
                dangerouslySetInnerHTML={{ __html: diary.content }}
              ></p>
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
