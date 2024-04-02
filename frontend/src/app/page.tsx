import Login from "./(public)/login/page";
import { Welcome } from "./(public)/welcome/page";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <Welcome />
    </main>
  );
}
