import { z } from "zod";
import { TaskStatus } from "./types";

export const createTaskSchema = z.object({
  name: z.string().trim().min(1, { message: "Required" }),
  status: z.nativeEnum(TaskStatus, { required_error: "Required" }),
  workspaceId: z.string().trim().min(1, { message: "Required" }),
  projectId: z.string().trim().min(1, { message: "Required" }),
  assigneeId: z.string().trim().min(1, { message: "Required" }),
  dueDate: z.coerce.date(),
  description: z.string().optional(),
});

export const getTasksSchema = z.object({
  workspaceId: z.string(),
  projectId: z.string().nullish(),
  assigneeId: z.string().nullish(),
  status: z.nativeEnum(TaskStatus).nullish(),
  search: z.string().nullish(),
  dueDate: z.string().nullish(),
});
