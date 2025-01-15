import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LoginForm from "../_components/loginForm";

export default async function loginPage(){
  const session = await getServerSession();

  if(session) return redirect("/billbooks");

  return <LoginForm />

}