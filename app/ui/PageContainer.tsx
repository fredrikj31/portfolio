interface PageContainerProps {
  children: React.ReactNode;
}

export default function PageContainer({ children }: PageContainerProps) {
  return (
    <div className="bg-white dark:bg-[#222222] min-h-screen transition-colors duration-500 mg:px-[35%] px-[5%] py-5 md:py-10 flex flex-col">
      {children}
    </div>
  );
}
