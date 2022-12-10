export interface HorizontalSimpleButtonProps {
  text?: string;
}

export default function HorizontalSimpleButton({
  text,
}: HorizontalSimpleButtonProps) {
  return (
    <button
      type="submit"
      className="w-full border rounded-md p-2 transition-colors hover-on"
    >
      {text ?? "Button"}
    </button>
  );
}
