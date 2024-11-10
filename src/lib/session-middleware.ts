import { AUTH_COOKIE } from "@/features/auth/constants";
import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import {
  Account,
  Client,
  Databases,
  Storage,
  Models,
  type Account as AccountType,
  type Storage as StorageType,
  type Databases as DatabasesType,
  type Users as UsersType,
} from "node-appwrite";

type AdditionalContext = {
  Variables: {
    account: AccountType;
    storage: StorageType;
    databases: DatabasesType;
    users: UsersType;
    user: Models.User<Models.Preferences>;
  };
};

export const sessionMiddleware = createMiddleware<AdditionalContext>(
  async (c, next) => {
    const session = getCookie(c, AUTH_COOKIE);

    if (!session) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const client = new Client()
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!);

    client.setSession(session);

    const account = new Account(client);
    const databases = new Databases(client);
    const storage = new Storage(client);

    const user = await account.get();

    c.set("account", account);
    c.set("databases", databases);
    c.set("storage", storage);
    c.set("user", user);

    await next();
  },
);
