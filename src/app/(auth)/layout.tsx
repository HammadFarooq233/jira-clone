import Navbar from "@/components/features/auth/navbar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-neutral-100">
      <div className="mx-auto max-w-2xl p-4">
        <Navbar />

        <div className="flex flex-col items-center justify-center pt-4 md:mt-14"></div>

        {children}
      </div>
    </main>
  );
}
