import { WidgetItem } from "@/components/WidgetItem";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/api/auth/signin");

  return (
    <div className="grid gap-6 grid-cols-1">
      <WidgetItem title="User connected S-Side ">
        <div className="flex flex-col  items-center ">
          <span className="text-center ">{JSON.stringify(session)}</span>
          <span>
            {" "}
            <span className="font-bold text-2xl">Name: </span>{" "}
            {session.user?.name}
          </span>
          <span>
            {" "}
            <span className="font-bold text-2xl">Email: </span>
            {session.user?.email}
          </span>
          <span>
            <span className="font-bold text-2xl">Image: </span>{" "}
            {session.user?.image}
          </span>
        </div>
      </WidgetItem>
    </div>
  );
}
