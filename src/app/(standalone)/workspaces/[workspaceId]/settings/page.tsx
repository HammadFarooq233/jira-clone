import { getCurrent } from "@/features/auth/actions";
import { redirect } from "next/navigation";
import WorkspaceIdSettingsClient from "./client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jira Clone - Workspace Settings",
};

export default async function Page() {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  return <WorkspaceIdSettingsClient />;
}
