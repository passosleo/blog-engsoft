import Welcome from "./(public)/(welcome)/page";

export default function Initial() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <Welcome />
    </main>
  );
}
