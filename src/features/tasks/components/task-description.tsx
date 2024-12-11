import { Button } from "@/components/ui/button";
import { Task } from "../types";
import { PencilIcon, XIcon } from "lucide-react";
import { DottedSeparator } from "@/components/dotted-separator";
import { useState } from "react";
import { useUpdateTask } from "../api/use-update-task";
import { Textarea } from "@/components/ui/textarea";

interface TaskOverviewProps {
  task: Task;
}

export default function TaskDescription({ task }: TaskOverviewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(task.description);

  const { mutate: updateTask, isPending: isUpdatingTask } = useUpdateTask();

  const handleSave = () => {
    updateTask({
      json: { description },
      param: {
        taskId: task.$id,
      },
    });
  };

  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">Overview</p>
        <Button
          size={"sm"}
          variant={"secondary"}
          onClick={() => setIsEditing((prev) => !prev)}
        >
          {isEditing ? (
            <XIcon className="mr-2 size-4" />
          ) : (
            <PencilIcon className="mr-2 size-4" />
          )}
          {isEditing ? "Cancel" : "Edit"}
        </Button>
      </div>

      <DottedSeparator className="my-4" />

      {isEditing ? (
        <div className="flex flex-col gap-y-4">
          <Textarea
            placeholder="Add a description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            disabled={isUpdatingTask}
          />

          <Button
            className="ml-auto w-fit"
            size={"sm"}
            onClick={handleSave}
            disabled={isUpdatingTask}
          >
            {isUpdatingTask ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      ) : (
        <div>
          {task.description || (
            <span className="text-muted-foreground">No description set</span>
          )}
        </div>
      )}
    </div>
  );
}
