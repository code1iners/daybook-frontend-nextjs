import { createNotification } from "@/libs/clients/notification-helpers";

export default function Me() {
  const onMeClick = () => {
    createNotification("회원가입이 성공했습니다.");
  };
  return (
    <article className="h-full flex flex-col justify-center items-center">
      <span onClick={onMeClick}>Me</span>
    </article>
  );
}
