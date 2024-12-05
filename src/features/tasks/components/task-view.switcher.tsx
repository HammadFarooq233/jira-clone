"use client";

import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader, PlusIcon } from "lucide-react";
import { useCreateTaskModal } from "../hooks/use-create-task-modal";
import { useGetTasks } from "../api/use-get-tasks";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useQueryState } from "nuqs";
import DataFilters from "./data-filters";
import useTaskFilters from "../hooks/use-task-filters";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default function TaskViewSwitcher() {
  const [view, setView] = useQueryState("task-view", { defaultValue: "table" });

  const [{ status, search, dueDate, assigneeId, projectId }] = useTaskFilters();

  const { open } = useCreateTaskModal();

  const workspaceId = useWorkspaceId();

  const { data: tasks, isLoading: isLoadingTasks } = useGetTasks({
    workspaceId,
    projectId,
    assigneeId,
    search,
    status,
    dueDate,
  });

  return (
    <Tabs
      defaultValue={view}
      onValueChange={setView}
      className="w-full flex-1 rounded-lg border"
    >
      <div className="flex h-full flex-col overflow-auto p-4">
        <div className="flex flex-col items-center justify-between gap-y-2 lg:flex-row">
          <TabsList className="w-full lg:w-auto">
            <TabsTrigger className="w-full lg:w-auto" value="table">
              Table
            </TabsTrigger>

            <TabsTrigger className="w-full lg:w-auto" value="kanban">
              Kanban
            </TabsTrigger>

            <TabsTrigger className="w-full lg:w-auto" value="calendar">
              Calendar
            </TabsTrigger>
          </TabsList>

          <Button size={"sm"} className="w-full lg:w-auto" onClick={open}>
            <PlusIcon className="mr-2 size-4" />
            New
          </Button>
        </div>

        <DottedSeparator className="my-4" />

        <DataFilters />

        <DottedSeparator className="my-4" />

        {isLoadingTasks ? (
          <div className="w-fulll flex h-[200px] flex-col items-center justify-center rounded-lg border">
            <Loader className="size-5 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            <TabsContent value="table" className="mt-0">
              <DataTable columns={columns} data={tasks?.documents ?? []} />
            </TabsContent>

            <TabsContent value="kanban" className="mt-0">
              {JSON.stringify(tasks)}
            </TabsContent>

            <TabsContent value="calendar" className="mt-0">
              {JSON.stringify(tasks)}
            </TabsContent>
          </>
        )}
      </div>
    </Tabs>
  );
}
