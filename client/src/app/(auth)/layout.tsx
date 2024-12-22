

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
      <div className="w-full relative bg-background flex justify-around flex-col bg-zinc-100 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black">
        {children}
      </div>
  );
}
