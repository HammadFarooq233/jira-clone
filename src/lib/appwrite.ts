import "server-only";

import { Client, Account, Databases, Storage, Users } from "node-appwrite";

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setKey(process.env.NEXT_APPWRITE_KEY!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

  return {
    get account() {
      return new Account(client);
    },
    get users() {
      return new Users(client);
    },
  };
}
