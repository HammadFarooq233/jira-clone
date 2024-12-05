import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ExternalLinkIcon, PencilIcon, TrashIcon } from "lucide-react";

interface TaskActionsProps {
  id: string;
  projectId: string;
  children: React.ReactNode;
}

export default function TaskActions({
  id,
  projectId,
  children,
}: TaskActionsProps) {
  return (
    <div className="flex justify-end">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      </DropdownMenu>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem
          disabled={false}
          className="p-[10px] font-medium"
          onClick={() => {}}
        >
          <ExternalLinkIcon className="mr-2 size-4 stroke-2" />
          Task Details
        </DropdownMenuItem>

        <DropdownMenuItem
          disabled={false}
          className="p-[10px] font-medium"
          onClick={() => {}}
        >
          <ExternalLinkIcon className="mr-2 size-4 stroke-2" />
          Open Project
        </DropdownMenuItem>

        <DropdownMenuItem
          disabled={false}
          className="p-[10px] font-medium"
          onClick={() => {}}
        >
          <PencilIcon className="mr-2 size-4 stroke-2" />
          Edit Task
        </DropdownMenuItem>

        <DropdownMenuItem
          disabled={false}
          className="p-[10px] font-medium"
          onClick={() => {}}
        >
          <ExternalLinkIcon className="mr-2 size-4 stroke-2" />
          Open Project
        </DropdownMenuItem>

        <DropdownMenuItem
          disabled={false}
          className="p-[10px] font-medium text-amber-700 focus:text-amber-700"
          onClick={() => {}}
        >
          <TrashIcon className="mr-2 size-4 stroke-2" />
          Delete Task
        </DropdownMenuItem>
      </DropdownMenuContent>
    </div>
  );
}
