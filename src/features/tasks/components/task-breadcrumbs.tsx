import { Project } from "@/features/projects/types";
import { Task } from "../types";
import ProjectAvatar from "@/features/projects/components/project-avatar";
import Link from "next/link";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { ChevronRightIcon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDeleteTask } from "../api/use-delete-task";
import { useRouter } from "next/navigation";
import { useConfirm } from "@/hooks/use-confirm";

interface TaskBreadcrumbsProps {
  task: Task;
  project: Project;
}

export default function TaskBreadcrumbs({
  task,
  project,
}: TaskBreadcrumbsProps) {
  const router = useRouter();

  const workspaceId = useWorkspaceId();
  const { mutate: deleteTask, isPending: isDeletingTask } = useDeleteTask();

  const [ConfirmDialog, confirm] = useConfirm(
    "Delete Task",
    "This action cannot be undone",
    "destructive",
  );

  const handleDeleteTask = async () => {
    const ok = await confirm();
    if (!ok) return;

    deleteTask(
      { param: { taskId: task.$id } },
      {
        onSuccess: () => {
          router.push(`/workspaces/${workspaceId}/tasks`);
        },
      },
    );
  };

  return (
    <div className="flex items-center gap-x-2">
      <ConfirmDialog />

      <ProjectAvatar
        name={project.name}
        image={project.imageUrl}
        className="size-6 lg:size-8"
      />

      <Link href={`/workspaces/${workspaceId}/projects/${project.$id}`}>
        <p
          className={`text-sm font-semibold text-muted-foreground transition hover:opacity-75 lg:text-lg`}
        >
          {project.name}
        </p>
      </Link>

      <ChevronRightIcon className="size-4 text-muted-foreground lg:size-5" />

      <p className="text-sm font-semibold lg:text-lg">{task.name}</p>

      <Button
        className="ml-auto"
        variant={"destructive"}
        size={"sm"}
        onClick={handleDeleteTask}
        disabled={isDeletingTask}
      >
        <TrashIcon className="size-4 lg:mr-2" />
        <span className="hidden lg:block">Delete Task</span>
      </Button>
    </div>
  );
}
