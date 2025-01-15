import { NextAuthOptions } from "next-auth";
import prisma from "../../../../../db/db";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt"


const nextOptions : NextAuthOptions = {
    providers : [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            async authorize(credentials, req) : Promise<any> {
                if(credentials==undefined){
                    return null
                }
                const user = await prisma.user.findUnique({
                    where : {
                        email : credentials.email
                    }
                })
                if(!user){
                    throw new Error("Email is not registered");
                }

                const isValidPassword = await bcrypt.compare(credentials.password,user.password);

                if(!isValidPassword){
                    throw new Error("Email or Password is Incorrect");
                }

                return { userId: user.userId, name : user.name };
            },
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
          }),
        
    ],
    pages : {
        signIn : "/login",

    },
    callbacks :{
        async jwt({ token, user }) {
            if(user){
                token.userId = user.userId
                token.name = user.name
            }
            return token
        },
        async session({ session, token }) {
            if(token){
                session.user = {
                    ...session.user,
                    userId : token.userId,
                    name : token.name
                }
            }

            return session
        },
        
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy : "jwt"
    }


}

export default nextOptions;