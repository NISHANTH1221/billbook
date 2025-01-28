import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import nextOptions from "../../auth/[...nextauth]/options";
import { BillBookCreationBody } from "../../_models/model";
import prisma from "../../../../../db/db";

export async function POST(req:NextRequest){
   const session = await getServerSession(nextOptions);


   const userId : string | undefined = session?.user.userId;

   if(!session && !userId){
    return NextResponse.json({
        error: "Login First.BC!",
    });
   }

   const body : BillBookCreationBody = await req.json();

   try{
     const createdbillbook = await prisma.billBook.create({
        data:{
            title : body.title,
            description : body.description,
            createdby : userId || ""
        }
    });


    await prisma.billBookUser.create({
        data: {
            name: "You",
            email: session?.user.email || "",
            billbookId: createdbillbook?.billbookId || ""
        }
    });

    return NextResponse.json(
    {
        message : "You have successfully created bill book"
    },{
        status : 200
    });
   }
   catch(e : any){
    return NextResponse.json({
        error: e.message
    });
   }

}