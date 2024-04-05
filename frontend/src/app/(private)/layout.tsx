import { Header } from "@/layout/Header";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <main className="h-screen w-full pt-20 max-w-screen-xl mx-auto px-4 ">
        {children}
      </main>
    </div>
  );
}
