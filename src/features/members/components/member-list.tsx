import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import MemberAvatar from "@/features/members/components/member-avatar";
import { Member } from "@/features/members/types";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { SettingsIcon } from "lucide-react";
import Link from "next/link";

interface MemberListProps {
  members: Member[];
  total: number;
}

export const MemberList = ({ members, total }: MemberListProps) => {
  const workspaceId = useWorkspaceId();

  return (
    <div className="col-span-1 flex flex-col gap-y-4">
      <div className="rounded-lg border bg-white p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Members ({total})</p>
          <Button asChild variant={"secondary"} size={"icon"}>
            <Link href={`/workspaces/${workspaceId}/members`}>
              <SettingsIcon className="size-4 text-neutral-400" />
            </Link>
          </Button>
        </div>

        <DottedSeparator className="my-4" />

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <li key={member.$id}>
              <Card className="overflow-hidden rounded-lg shadow-none">
                <CardContent className="flex flex-col items-center gap-x-2 p-3">
                  <MemberAvatar className="size-12" name={member.name} />

                  <div className="flex flex-col items-center overflow-hidden">
                    <p className="line-clamp-1 text-lg font-medium">
                      {member.name}
                    </p>
                    <p className="line-clamp-1 text-sm text-muted-foreground">
                      {member.email}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}

          <li className="hidden text-center text-sm text-muted-foreground first-of-type:block">
            No members found
          </li>
        </ul>
      </div>
    </div>
  );
};
