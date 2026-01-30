import { redirect } from "next/navigation";
import { auth0 } from "@/lib/auth0";
import DashboardPage from "./components/dashboard-client";

export default async function MyExperiencePage() {
  const session = await auth0.getSession();

  if (!session) {
    redirect("/getStarted");
  }

  return <DashboardPage />;
}
