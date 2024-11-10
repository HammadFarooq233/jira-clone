import { getCurrent } from "@/features/auth/actions";
import Navbar from "@/features/auth/components/navbar";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrent();

  if (user) redirect("/");

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
