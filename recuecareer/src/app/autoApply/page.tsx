import AutoApply from "./components/autoAppply-client";
import { redirect } from "next/navigation";
import { auth0 } from "@/lib/auth0";

export default async function AutoApplyPage() {
  const session = await auth0.getSession();

  if (!session) {
    redirect("/getStarted");
  }
    return <AutoApply />;
}
