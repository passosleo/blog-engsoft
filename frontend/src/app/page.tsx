import { AuthProvider } from "@/context/AuthContext";
import AuthCondicional from "./(public)/(auth)/page";

export default function Initial() {
  return (
    <AuthProvider>
      <main className="flex min-h-screen flex-col items-center justify-between ">
        <AuthCondicional />
      </main>
    </AuthProvider>
  );
}
