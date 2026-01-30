interface PageContainerProps {
  children: React.ReactNode;
}

export default function PageContainer({ children }: PageContainerProps) {
  return <main className="max-w-5xl mx-auto h-full px-4 lg:px-0">{children}</main>;
}
