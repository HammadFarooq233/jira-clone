import { getCurrent } from "@/features/auth/actions";
import { AUTH_COOKIE } from "@/features/auth/constants";
import { client } from "@/lib/rpc";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const cookieStore = cookies();
  const session = cookieStore.get(AUTH_COOKIE);

  const response = await client.api.workspaces.$get(
    {},
    {
      headers: {
        Cookie: `${AUTH_COOKIE}=${session?.value}`,
      },
    },
  );

  const { data: workspaces } = await response.json();

  if (workspaces.documents.length === 0) {
    redirect("/workspaces/create");
  } else {
    redirect(`/workspaces/${workspaces.documents[0].$id}`);
  }
}
