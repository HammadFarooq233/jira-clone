import { createAdminClient } from "@/lib/appwrite";
import { sessionMiddleware } from "@/lib/session-middleware";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { getMember } from "../utils";
import { DATABASE_ID, MEMBERS_ID } from "@/config";
import { Query } from "node-appwrite";
import { Member, MembersRole } from "../types";

const app = new Hono()
  .get(
    "/",
    sessionMiddleware,
    zValidator("query", z.object({ workspaceId: z.string() })),
    async (c) => {
      const { users } = await createAdminClient();
      const databases = c.get("databases");
      const user = c.get("user");

      const { workspaceId } = c.req.valid("query");

      const member = await getMember({
        databases,
        userId: user.$id,
        workspaceId,
      });

      if (!member) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const members = await databases.listDocuments<Member>(
        DATABASE_ID,
        MEMBERS_ID,
        [Query.equal("workspaceId", workspaceId)],
      );

      const populatedMembers = await Promise.all(
        members.documents.map(async (member) => {
          const user = await users.get(member.userId);

          return {
            ...member,
            name: user.name,
            email: user.email,
          };
        }),
      );

      return c.json({ data: { ...members, documents: populatedMembers } });
    },
  )
  .delete("/:memberId", sessionMiddleware, async (c) => {
    const { memberId } = c.req.param();
    const user = c.get("user");
    const databases = c.get("databases");

    const memberToDelete = await databases.getDocument(
      DATABASE_ID,
      MEMBERS_ID,
      memberId,
    );

    const member = await getMember({
      databases,
      userId: user.$id,
      workspaceId: memberToDelete.workspaceId,
    });

    if (!member) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    if (
      member.$id !== memberToDelete.$id &&
      member.role !== MembersRole.ADMIN
    ) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const allMembersInWorkspace = await databases.listDocuments(
      DATABASE_ID,
      MEMBERS_ID,
      [Query.equal("workspaceId", memberToDelete.workspaceId)],
    );

    if (allMembersInWorkspace.total === 1) {
      return c.json({ error: "Cannot delete the only member" }, 400);
    }

    await databases.deleteDocument(DATABASE_ID, MEMBERS_ID, memberToDelete.$id);

    return c.json({ data: { memberId: memberToDelete.$id } });
  })
  .patch(
    "/:memberId",
    sessionMiddleware,
    zValidator("json", z.object({ role: z.nativeEnum(MembersRole) })),
    async (c) => {
      const { memberId } = c.req.param();
      const { role } = c.req.valid("json");

      const user = c.get("user");
      const databases = c.get("databases");

      const memberToUpdate = await databases.getDocument(
        DATABASE_ID,
        MEMBERS_ID,
        memberId,
      );

      const member = await getMember({
        databases,
        userId: user.$id,
        workspaceId: memberToUpdate.workspaceId,
      });

      if (!member) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      if (member.role !== MembersRole.ADMIN) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const allMembersInWorkspace = await databases.listDocuments(
        DATABASE_ID,
        MEMBERS_ID,
        [Query.equal("workspaceId", memberToUpdate.workspaceId)],
      );

      if (allMembersInWorkspace.total === 1) {
        return c.json({ error: "Cannot downgrade the only member" }, 400);
      }

      await databases.updateDocument(
        DATABASE_ID,
        MEMBERS_ID,
        memberToUpdate.$id,
        {
          role,
        },
      );

      return c.json({ data: { memberId: memberToUpdate.$id } });
    },
  );

export default app;
