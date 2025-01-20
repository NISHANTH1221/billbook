import { getServerSession } from "next-auth";
import SignUpForm from "../_components/signUpForm";
import { redirect } from "next/navigation";
import nextOptions from "@/app/api/auth/[...nextauth]/options";


export default async function signUpPage(){
   const session = await getServerSession(nextOptions );

   if(session){
    return redirect('/billbooks')
   }

   return(
    <SignUpForm />
   )
}