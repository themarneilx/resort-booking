import "dotenv/config";
import { eq } from "drizzle-orm";
import { db } from "../src/lib/db/index";
import { users } from "../src/lib/db/schema";

const email = process.argv[2];

if (!email) {
  console.error("Please provide an email address.");
  console.log("Usage: npx tsx scripts/make-admin.ts <email>");
  process.exit(1);
}

async function main() {
  console.log(`Promoting user with email: ${email} to ADMIN...`);

  try {
    const result = await db
      .update(users)
      .set({ role: "ADMIN" })
      .where(eq(users.email, email))
      .returning({ id: users.id, email: users.email, role: users.role });

    if (result.length === 0) {
      console.error(`User with email ${email} not found.`);
      process.exit(1);
    }

    console.log("Success! User updated:", result[0]);
  } catch (error) {
    console.error("Error updating user:", error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

main();
