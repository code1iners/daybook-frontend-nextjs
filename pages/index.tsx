import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { makeCalendar } from "@ce1pers/date-helpers";
import { clazz } from "@ce1pers/use-class";
import { ApiResponse, CoreResponse } from "./_app";
import Loading from "@/components/loading";
import { useRouter } from "next/router";
import { clearAccessTokenFromSession } from "@/libs/clients/storage-helpers";
import { useSetRecoilState } from "recoil";
import { accessTokenState } from "atoms/auth";
import { CalendarDateItem } from "@ce1pers/date-helpers/dist/src/calendar-helpers/types";
import ArrowButton from "@/components/arrow-button";

export interface MergedCalendar {
  client: CalendarDateItem;
  server?: DiaryItem;
}

export interface DiaryItem {
  count: number;
  day: number;
}

export interface RetrieveDiaries {
  month: string;
  year: string;
  diaries: DiaryItem[];
}

export default function Home() {
  const now = new Date();
  const router = useRouter();
  const setAccessToken = useSetRecoilState(accessTokenState);

  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [calendar, setCalendar] = useState<MergedCalendar[]>([]);

  const { data, isValidating } = useSWR<CoreResponse<RetrieveDiaries>>([
    `api/v1/diaries?year=${year}&month=${String(month).padStart(2, "0")}`,
  ]);
  const memoizedCalendar = useMemo(
    () => makeCalendar(year, month),
    [year, month]
  );

  const isCurrentMonth = (__month__: number) => __month__ === month;

  useEffect(() => {
    if (data?.status === 403) {
      clearAccessTokenFromSession();
      setAccessToken(undefined);
      router.replace("/auth/sign-in");
    }

    if (data?.data.ok) {
      const { diaries } = data.data.data;
      if (Array.isArray(diaries)) {
        const parsedCalendar = memoizedCalendar.map((date, i) => {
          if (date.month !== month) return { client: date };
          const diary = diaries.at(date.date - 1);
          return { client: date, server: diary };
        });
        setCalendar(parsedCalendar);
      }
    }
  }, [data]);

  // Handler.
  const onLeftClick = () => {
    setMonth((curr) => {
      const isPreviousYear = curr === 1;
      if (isPreviousYear) setYear((curr) => curr - 1);
      return isPreviousYear ? 12 : curr - 1;
    });
  };

  const onRightClick = () => {
    setMonth((curr) => {
      const isNextYear = curr === 12;
      if (isNextYear) setYear((curr) => curr + 1);
      return isNextYear ? 1 : curr + 1;
    });
  };

  if (isValidating) return <Loading />;

  return (
    <article className="p-10 h-full flex flex-col space-y-10">
      <div className="flex items-center justify-center gap-3">
        <ArrowButton onClick={onLeftClick} size="sm" />
        <h2>
          {year} 년 {month} 월
        </h2>
        <ArrowButton onClick={onRightClick} direction="right" size="sm" />
      </div>
      <ul className="grid grid-cols-7 gap-2 h-full">
        {calendar.map((date) => (
          <li
            key={date.client.key}
            className={clazz(
              "w-full h-full text-center flex flex-col items-center justify-between gap-1 cursor-pointer border rounded-md shadow-md divide-y",
              isCurrentMonth(date.client.month) ? "" : "text-gray-400"
            )}
          >
            <h2 className={clazz(date.client.isToday ? "" : "")}>
              {date.client.date}
            </h2>
            <div className="grow w-full flex justify-center items-center">
              {isCurrentMonth(date.client.month) ? (
                <span className="underline underline-offset-4 text-sm">
                  {date.server?.count ?? "0"}
                </span>
              ) : (
                <span>-</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}
