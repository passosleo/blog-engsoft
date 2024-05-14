"use client"
import { Authorized } from "@/context/Authorized";
import { Header } from "@/layout/Header";
import { useRequest } from "@/services/hooks/useRequest";
import { useCategories } from "@/stores/categories";
import { Category } from "@/types/category";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setCategories } = useCategories();
  const [getCategories, isLoading, categories] = useRequest<void, Category[]>({
    host: "postService",
    routeName: "getCategories",
    onSuccess: (res) => setCategories(res.data)
  });

  return (
    <Authorized>
      <div>
        <Header />
        <main className="h-screen w-full mt-16 max-w-screen-xl mx-auto p-4 ">
          {children}
        </main>
      </div>
    </Authorized>
  );
}
