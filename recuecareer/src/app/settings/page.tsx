import { redirect } from "next/navigation";
import { auth0 } from "@/lib/auth0";
import SettingsPage from "./components/client-settings";

export default async function MyExperiencePage() {
  const session = await auth0.getSession();

  if (!session) {
    redirect("/getStarted");
  }

  return <SettingsPage />;
}
