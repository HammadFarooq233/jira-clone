import { parseAsString, parseAsStringEnum, useQueryStates } from "nuqs";
import { TaskStatus } from "../types";

export default function useTaskFilters() {
  return useQueryStates({
    projectId: parseAsString,
    assigneeId: parseAsString,
    dueDate: parseAsString,
    search: parseAsString,
    status: parseAsStringEnum(Object.values(TaskStatus)),
  });
}
