interface PageContainerProps {
  children: React.ReactNode;
}

export default function PageContainer({ children }: PageContainerProps) {
  return (
    <div className="bg-white dark:bg-[#222222] min-h-screen transition-colors duration-500 px-4 py-4 md:py-10 flex flex-col">
      <div className="mx-auto w-full max-w-full md:max-w-2xl mg:max-w-3xl lg:max-w-4xl">{children}</div>
    </div>
  );
}
