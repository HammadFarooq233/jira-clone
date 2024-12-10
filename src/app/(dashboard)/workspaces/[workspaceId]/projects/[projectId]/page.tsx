import { Button } from "@/components/ui/button";
import { getCurrent } from "@/features/auth/actions";
import { AUTH_COOKIE } from "@/features/auth/constants";
import ProjectAvatar from "@/features/projects/components/project-avatar";
import TaskViewSwitcher from "@/features/tasks/components/task-view-switcher";
import { client } from "@/lib/rpc";
import { PencilIcon } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
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
    throw new Error("Project not found.");
  }

  const { data: project } = await response.json();

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <ProjectAvatar
            image={project.imageUrl}
            name={project.name}
            className="size-8"
          />
          <p className="text-lg font-semibold">{project.name}</p>
        </div>

        <Button variant={"secondary"} size={"sm"} asChild>
          <Link
            href={`/workspaces/${project.workspaceId}/projects/${project.$id}/settings`}
          >
            <PencilIcon className="mr-2 size-4" />
            Edit Project
          </Link>
        </Button>
      </div>

      <TaskViewSwitcher hideProjectFilter />
    </div>
  );
}
