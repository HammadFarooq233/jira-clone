"use client";

import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useCreateProjectModal } from "@/features/projects/hooks/use-create-project-modal";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiAddCircleFill } from "react-icons/ri";

export default function Projects() {
  const pathname = usePathname();

  const workspaceId = useWorkspaceId();

  // TODO: Create useProjectId hook and use here to get the projectId
  const projectId = null;

  const { data } = useGetProjects({ workspaceId });

  const { open } = useCreateProjectModal();

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between text-neutral-500">
        <p className="text-xs uppercase">Projects</p>

        <RiAddCircleFill
          onClick={open}
          className="size-5 cursor-pointer transition hover:opacity-75"
        />
      </div>

      {data?.documents.map((project) => {
        const href = `/workspaces/${workspaceId}/projects/${projectId}`;
        const isActive = pathname === href;

        return (
          <Link href={href} key={project.$id}>
            <div
              className={cn(
                "flex cursor-pointer items-center gap-2.5 rounded-md p-2.5 text-neutral-500 transition hover:opacity-75",
                isActive && "bg-white text-primary shadow-sm hover:opacity-100",
              )}
            >
              <span className="truncate">{project.name}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
