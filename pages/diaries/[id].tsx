import { useRouter } from "next/router";

export default function RetrieveDiary() {
  const router = useRouter();

  return (
    <article className="h-full flex flex-col items-center p-10">
      Diary ({router.query.id})
    </article>
  );
}
