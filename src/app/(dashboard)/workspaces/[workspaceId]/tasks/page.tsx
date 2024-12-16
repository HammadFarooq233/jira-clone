import { getCurrent } from "@/features/auth/actions";
import TaskViewSwitcher from "@/features/tasks/components/task-view-switcher";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jira Clone - Tasks",
};

export default async function Page() {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  return (
    <div className="flex h-full flex-col">
      <TaskViewSwitcher />;
    </div>
  );
}
