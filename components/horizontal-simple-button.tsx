export interface HorizontalSimpleButtonProps {
  text?: string;
  children?: React.ReactNode;
}

export default function HorizontalSimpleButton({
  text,
  children,
}: HorizontalSimpleButtonProps) {
  return (
    <button
      type="submit"
      className="flex items-center justify-center gap-1 w-full border rounded-md p-2 transition-colors hover-on"
    >
      {text ?? "Button"}
      {children}
    </button>
  );
}
