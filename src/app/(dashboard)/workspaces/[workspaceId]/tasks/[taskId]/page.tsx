import { getCurrent } from "@/features/auth/actions";
import { redirect } from "next/navigation";
import TaskIdClient from "./client";

export default async function Page() {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  return <TaskIdClient />;
}
