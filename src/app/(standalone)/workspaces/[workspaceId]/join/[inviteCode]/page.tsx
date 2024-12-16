import { getCurrent } from "@/features/auth/actions";
import { redirect } from "next/navigation";
import WorkspaceIdJoinClient from "./client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jira Clone - Join Workspace",
};

export default async function Page() {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  return <WorkspaceIdJoinClient />;
}
