import { getCurrent } from "@/features/auth/actions";
import { AUTH_COOKIE } from "@/features/auth/constants";
import EditProjectForm from "@/features/projects/components/edit-project-form";
import { client } from "@/lib/rpc";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface PageProps {
  params: {
    projectId: string;
  };
}

export default async function Page({ params }: PageProps) {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const cookieStore = cookies();
  const session = cookieStore.get(AUTH_COOKIE);

  const response = await client.api.projects[":projectId"]["$get"](
    {
      param: { projectId: params.projectId },
    },
    {
      headers: {
        Cookie: `${AUTH_COOKIE}=${session?.value}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch project");
  }

  const { data: project } = await response.json();

  return (
    <div className="w-full lg:max-w-xl">
      <EditProjectForm initialValues={project} />
    </div>
  );
}
