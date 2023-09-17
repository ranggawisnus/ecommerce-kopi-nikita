import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { OPTIONS } from "../api/auth/[...nextauth]/route";
import Main from "./components/main";
import prisma from "@/lib/prisma";
import { userItems, items } from "./components/menu";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(OPTIONS);

  // it safe to run this query on the server, don't call it on client side!
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email ?? "",
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
    },
  });

  //need to run this on server to make sure no one can change the role on frontend to see admin menu
  const menu = user?.role === "user" ? userItems : items;

  return (
    <Main user={user} menu={menu}>
      {children}
    </Main>
  );
}