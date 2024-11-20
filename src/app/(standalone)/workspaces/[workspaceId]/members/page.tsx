import { getCurrent } from "@/features/auth/actions";
import MembersList from "@/features/workspaces/components/members-list";
import { redirect } from "next/navigation";

export default async function MembersPage() {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  return (
    <div className="w-full lg:max-w-xl">
      <MembersList />
    </div>
  );
}
