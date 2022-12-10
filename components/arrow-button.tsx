import { clazz } from "@ce1pers/use-class";

export type ArrowDirection = "left" | "right" | "top" | "bottom";
export type ArrowSize = "sm" | "md" | "lg";

interface ArrowButtonProps {
  direction?: ArrowDirection;
  size?: ArrowSize;
  classNames?: string;
  onClick?: () => void;
}

export default function ArrowButton({
  direction = "left",
  size = "md",
  classNames,
  onClick,
}: ArrowButtonProps) {
  const makeDirectionClassName = () => {
    switch (direction) {
      case "right":
        return "rotate-180";
      case "top":
        return "rotate-90";
      case "bottom":
        return "-rotate-90";
      default:
        return "";
    }
  };

  const makeSizeClassName = () => {
    switch (size) {
      case "sm":
        return "w-5 h-5";
      case "lg":
        return "w-7 h-7";
      default:
        return "w-6 h-6";
    }
  };

  return (
    <button
      onClick={onClick}
      className={clazz(
        classNames ?? "",
        "transition hover:scale-110 hover:text-indigo-500"
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={clazz(makeDirectionClassName(), makeSizeClassName())}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
        />
      </svg>
    </button>
  );
}
