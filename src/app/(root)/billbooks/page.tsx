import prisma from "../../../../db/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { BillBookPreview } from "../_components/models";
import { HomePageComponent } from "../_components/homePageViewComponent";
import nextOptions from "@/app/api/auth/[...nextauth]/options";

export default async function Homepage(){

  const session = await getServerSession(nextOptions);

  if (!session){
    return redirect("/login");
  }

  const userId : string | undefined =  session.user.userId;

  if(!userId){
    return redirect("/login")
  }

  const data : BillBookPreview[] = await getBillBooks(userId);

  return <HomePageComponent data={data}/>

}

async function getBillBooks(userId : string){
  const billBooks: BillBookPreview[] = await prisma.billBook.findMany({
    where : {
      createdby : userId
    },
    select : {
      billbookId : true,
      title : true,
      lastUpdated : true,
      description : true
    }
  });

  return billBooks;
  
}

