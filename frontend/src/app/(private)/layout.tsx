import { Header } from "@/layout/Header";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <main className="h-screen w-full mt-16 max-w-screen-xl mx-auto p-4 ">
        {children}
      </main>
    </div>
  );
}