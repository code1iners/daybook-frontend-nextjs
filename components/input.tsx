import { FieldError, UseFormRegisterReturn } from "react-hook-form";

export type InputType =
  | "button"
  | "checkbox"
  | "color"
  | "date"
  | "datetime-local"
  | "email"
  | "file"
  | "hidden"
  | "image"
  | "month"
  | "number"
  | "password"
  | "radio"
  | "range"
  | "reset"
  | "search"
  | "submit"
  | "tel"
  | "text"
  | "time"
  | "url"
  | "week";

interface InputProps {
  htmlId?: string;
  register: UseFormRegisterReturn;
  type?: InputType;
  placeholder?: string;
  errors?: string[];
  children?: React.ReactNode;
}

export default function Input({
  htmlId,
  register,
  type = "text",
  placeholder = "입력창",
  errors,
  children,
}: InputProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {children}
      {/* Input */}
      <input
        id={htmlId}
        className="border p-2 rounded-md tracking-widest"
        type={type}
        placeholder={placeholder}
        {...register}
      />

      {/* Errors */}
      {errors
        ?.filter((error) => !!error)
        .map((error) => (
          <span key={error} className="error-text">
            {error}
          </span>
        ))}
    </div>
  );
}
