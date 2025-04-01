import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { usersTable } from "@/db/schema";
import { hashPasswordWithSalt } from "@/lib/utils/helper";

const db = drizzle(process.env.DATABASE_URL!);

async function main() {
  const user: typeof usersTable.$inferInsert = {
    username: "admin",
    password: hashPasswordWithSalt("admin"),
  };

  await db.insert(usersTable).values(user).onConflictDoNothing();
  console.log("New user created!");

  const users = await db.select().from(usersTable);
  console.log("Getting all users from the database: ", users);
}

main();
