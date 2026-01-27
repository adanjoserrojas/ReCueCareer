import { redirect } from "next/navigation";
import { auth0 } from "@/lib/auth0";
import MyExperienceClient from "./components/myExperienceUI";

export default async function MyExperiencePage() {
  const session = await auth0.getSession();

  if (!session) {
    redirect("/getStarted");
  }

  return <MyExperienceClient />;
}
