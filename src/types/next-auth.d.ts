import "next-auth"
import { DefaultSession, DefaultUser } from "next-auth"
import { string } from "zod"

declare module "next-auth" {
    interface User{
        userId? : string,
        name? : string
    }

    interface Session{
        user : {
            userId? : string,
            name? : string
        }&DefaultSession["user"]
    }

}

declare module "next-auth/jwt"{
    interface JWT{
        userId? : string,
        name? : string
    }
}