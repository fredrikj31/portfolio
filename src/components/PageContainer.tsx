interface PageContainerProps {
  children: React.ReactNode;
}

export default function PageContainer({ children }: PageContainerProps) {
  return <main className="container mx-auto h-full">{children}</main>;
}
