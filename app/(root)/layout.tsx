import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { after } from "next/server";

import { auth } from "@/auth";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";

import Header from "@/components/Header";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user?.id) redirect("/sign-in");

  // Only once per day
  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, session?.user?.id))
    .limit(1);
  if (user[0].lastActivityDate === new Date().toISOString().slice(0, 10))
    return;

  //* LEARNING: after() -  Periodically update the users lastActivity upon login
  after(async () => {
    if (!session?.user?.id) return;
    await db
      .update(users)
      .set({ lastActivityDate: new Date().toISOString().slice(0, 10) })
      .where(eq(users.id, session?.user?.id));
  });
  return (
    <main className="root-container">
      <div className="mx-auto max-w-7xl">
        <Header session={session} />
        <div className="mt-20 pb-20">{children}</div>
      </div>
    </main>
  );
}
