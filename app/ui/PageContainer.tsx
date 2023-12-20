interface PageContainerProps {
  children: React.ReactNode;
}

export default function PageContainer({ children }: PageContainerProps) {
  return (
    <div className="bg-white dark:bg-[#222222] min-h-screen transition-colors duration-500 px-[35%] py-10 flex flex-col">
      {children}
    </div>
  );
}
