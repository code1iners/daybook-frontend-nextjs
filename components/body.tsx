interface BodyProps {
  children: React.ReactNode;
}

export default function Body({ children }: BodyProps) {
  return <main className="grow">{children}</main>;
}
