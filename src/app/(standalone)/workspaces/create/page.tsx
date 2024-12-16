import { getCurrent } from "@/features/auth/actions";
import CreateWorkspaceForm from "@/features/workspaces/components/create-workspace-form";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jira Clone - Create Workspace",
};

export default async function Page() {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  return (
    <div className="w-full lg:max-w-xl">
      <CreateWorkspaceForm />
    </div>
  );
}
