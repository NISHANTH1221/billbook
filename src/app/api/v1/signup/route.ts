import { NextRequest, NextResponse } from "next/server"
import prisma from "../../../../../db/db";
import bcrypt from "bcrypt"

export async function POST(req:NextRequest){
    if(req.method==="POST"){
        try{
            const { name , email , password } = await req.json();
    
            if (name == null && email == null && password == null){
                return NextResponse.json({
                    message : "Please provide valid credentials"
                },{
                    status: 409
                })
            }
    
            const user = await prisma.user.findUnique({
                where : {
                    email : email
                }
            });
    
            if(user != null){
                return NextResponse.json({
                    message : "You already Have an account please login"
                },{
                    status: 410
                })
            }
    
            const salt = await bcrypt.genSalt(10);
    
            const hashedPassword = await bcrypt.hash(password,salt);
    
            await prisma.user.create({
                data : {
                    name : name,
                    email : email,
                    password : hashedPassword
                }
            })
    
    
            return NextResponse.json({
                message : "Account Created Succesfully"
            },{
                status : 200
            })
    
        }catch(err: any){
            return NextResponse.json({
                message : "error while registering user"
            },{
                status : 500
            })
        }
    }
   
}