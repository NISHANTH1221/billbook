"use server"
import prisma from "../../../db/db";

interface UserDetails {
    email: string,
    name: string,
    billbookId : string
}

export async function createNewBill(description:string,amount : number,billbookId:string){
    try{
        const bill = await prisma.bill.create({
            data:{
                description:description,
                amount:amount,
                billbookId:billbookId
            }
        });
        return {
            success : true,
            bill
        };
    }catch(err:any){
        return {
            success : false,
        }
    }
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

interface BillUnitArray{
    billbookUserId : string,
    amount: number,
    billId: string
}

export async function createBillUnitsForBill(array : BillUnitArray[]){

    try{
        await prisma.$transaction(async(tx)=>{
           await tx.billUnits.createMany({
                data: array
            })
        });

        return {
            success : true
        }
    }catch(e){
        return {
            success : false
        }
    }
}


export async function deleteBill(billId : string){
    try{
        await prisma.bill.delete({
            where : {
                billId : billId
            }
        })

        return {
            success : true
        }


    }catch(e){
        return {
            sucess : false
        }

    }
}

export async function fetchBillDetails(billId : string){
    try{
        const billUnits = await prisma.billUnits.findMany({
            where : {
                billId : billId
            }
        });

        return {
            success : true,
            billUnits : billUnits.map((bill)=>{
                return{
                    amount : bill.amount,
                    billbookUserId : bill.billbookUserId
                }
            })
        }
    }catch(e){
        return{
            success : false
        }
    }

}