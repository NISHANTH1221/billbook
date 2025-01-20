"use server"
import prisma from "../../../db/db";

interface UserDetails {
    email: string,
    name: string,
    billbookId : string
}


export async function createNewUserForBillBook(userDetails : UserDetails){

    const { name , email , billbookId } = userDetails;

    const user = await prisma.billBookUser.create({
        data : {
            name,
            email,
            billbookId
        }
    })

    if(!user){
        return false
    }
    return true
    
}