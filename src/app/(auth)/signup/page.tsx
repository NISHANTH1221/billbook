import { getServerSession } from "next-auth";
import SignUpForm from "../_components/signUpForm";
import { redirect } from "next/navigation";


export default async function signUpPage(){
   const session = await getServerSession();

   if(session){
    return redirect('/')
   }

   return(
    <SignUpForm />
   )
}