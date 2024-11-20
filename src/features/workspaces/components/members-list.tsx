"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeftIcon, MoreVerticalIcon } from "lucide-react";
import Link from "next/link";
import { useWorkspaceId } from "../hooks/use-workspace-id";
import { DottedSeparator } from "@/components/dotted-separator";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { Fragment } from "react";
import MemberAvatar from "@/features/members/components/member-avatar";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteMember } from "@/features/members/api/use-delete-member";
import { useUpdateMember } from "@/features/members/api/use-update-member";
import { MembersRole } from "@/features/members/types";
import { useConfirm } from "@/hooks/use-confirm";

export default function MembersList() {
  const workspaceId = useWorkspaceId();

  const { data } = useGetMembers({ workspaceId });
  const { mutate: deleteMember, isPending: isDeletingMember } =
    useDeleteMember();
  const { mutate: updateMember, isPending: isUpdatingMember } =
    useUpdateMember();

  const [ConfirmDialog, confirm] = useConfirm(
    "Remove Member",
    "This member will be removed from the worskapce",
    "destructive",
  );

  const handleUpdateMember = (memberId: string, role: MembersRole) => {
    updateMember({
      json: { role },
      param: { memberId },
    });
  };

  const handleDeleteMember = async (memberId: string) => {
    const ok = await confirm();
    if (!ok) return;

    deleteMember(
      { param: { memberId } },
      {
        onSuccess: () => {
          window.location.reload();
        },
      },
    );
  };

  return (
    <Card className="h-full w-full border-none shadow-none">
      <ConfirmDialog />
      <CardHeader className="flex flex-row items-center gap-x-4 space-y-0 p-7">
        <Button asChild variant={"secondary"} size={"sm"}>
          <Link href={`/workspaces/${workspaceId}`}>
            <ArrowLeftIcon className="mr-2 size-4" />
            Back
          </Link>
        </Button>

        <CardTitle className="text-xl font-bold">Members List</CardTitle>
      </CardHeader>

      <div className="px-7">
        <DottedSeparator />
      </div>

      <CardContent className="p-7">
        {data?.documents.map((member, index) => (
          <Fragment key={member.$id}>
            <div className="flex items-center gap-2">
              <MemberAvatar
                name={member.name}
                className="size-10"
                fallbackClassName="text-lg"
              />

              <div className="flex flex-col">
                <p className="text-sm font-medium">{member.name}</p>
                <p className="text-xs text-muted-foreground">{member.email}</p>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant={"secondary"}
                    size={"icon"}
                    className="ml-auto"
                  >
                    <MoreVerticalIcon className="size-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent side="bottom" align="end">
                  <DropdownMenuItem
                    className="font-medium"
                    onClick={() =>
                      handleUpdateMember(member.$id, MembersRole.ADMIN)
                    }
                    disabled={isUpdatingMember}
                  >
                    Set as Administrator
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="font-medium"
                    onClick={() =>
                      handleUpdateMember(member.$id, MembersRole.MEMBER)
                    }
                    disabled={isUpdatingMember}
                  >
                    Set as Member
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="font-medium text-amber-700"
                    onClick={() => handleDeleteMember(member.$id)}
                    disabled={isDeletingMember}
                  >
                    Remove {member.name}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {index < data.documents.length - 1 && (
              <Separator className="my-2.5" />
            )}
          </Fragment>
        ))}
      </CardContent>
    </Card>
  );
}
