interface PageContainerProps {
  children: React.ReactNode;
}

export default function PageContainer({ children }: PageContainerProps) {
  return <main className="max-w-5xl mx-auto h-full px-4">{children}</main>;
}
