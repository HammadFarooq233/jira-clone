import { getCurrent } from "@/features/auth/actions";
import { AUTH_COOKIE } from "@/features/auth/constants";
import { client } from "@/lib/rpc";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface PageProps {
  params: {
    workspaceId: string;
  };
}

export default async function Page({ params }: PageProps) {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const cookieStore = cookies();
  const session = cookieStore.get(AUTH_COOKIE);

  const response = await client.api.workspaces[":workspaceId"]["info"]["$get"](
    {
      param: { workspaceId: params.workspaceId },
    },
    {
      headers: {
        Cookie: `${AUTH_COOKIE}=${session?.value}`,
      },
    },
  );

  if (!response.ok) redirect("/");

  const { data } = await response.json();

  return <div>join page {JSON.stringify(data)}</div>;
}
