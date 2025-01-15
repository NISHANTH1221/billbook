import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
export default function LandingPage(){
    return(
        <div className="w-full flex flex-row items-center justify-center">
            Create Bill Books now for free
        </div>
    )
}