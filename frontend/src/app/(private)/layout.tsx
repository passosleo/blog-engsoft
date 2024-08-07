"use client";
import { CustomLoading } from "@/components/CustomLoading";
import { Header } from "@/layout/Header";
import { useRequest } from "@/services/hooks/useRequest";
import { useCategories } from "@/stores/categories";
import { Category } from "@/types/category";
import { Suspense } from "react";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setCategories, setSelectedCategory } = useCategories();

  useRequest<void, Category[]>({
    host: "postService",
    routeName: "getCategories",
    onSuccess: (res) => {
      setCategories(res.data);
      setSelectedCategory(null);
    },
  });

  return (
    <>
      <div>
        <Header />
        <main className="h-screen w-full mt-16 max-w-screen-xl mx-auto p-4 ">
          <Suspense fallback={<CustomLoading isLoading fullScreen />}>
            {children}
          </Suspense>
        </main>
      </div>
    </>
  );
}
