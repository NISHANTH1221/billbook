"use client"
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createNewUserForBillBook } from '@/app/(server_actions)/actions'
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address")
})

type UserFormValues = z.infer<typeof userSchema>


export function AlertDialogUser({billbookId}: {billbookId : string}){
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

    const form = useForm<UserFormValues>({
        resolver: zodResolver(userSchema),
        defaultValues: {
          name: "",
          email: "",
        }
      })
    
      const handleAddNewUser = async (values: UserFormValues) => {

        if(!values.name || !values.email.endsWith("@gmail.com")){
            toast({
                title: "Error",
                description: "Incomplete Details or You are not using Gmail",
                variant: "destructive"
            })
            return;
        }
    
        let userDetails = {
          ...values,
          billbookId : billbookId
        }

        const isUserCreated = await createNewUserForBillBook(userDetails);

        if(!isUserCreated){
            toast({
                title: "Error",
                description: "Failed to create user, Try again after few minutes",
                variant: "destructive"
            })
        }

        setIsAddUserDialogOpen(false)
        form.reset()


        toast({
            title: "Success",
            description: "User created successfully",
        });

        router.refresh();
      }
    return(
        <>
            <Button
                variant="outline"
                className="h-auto py-2 px-4 justify-start text-primary"
                onClick={() => setIsAddUserDialogOpen(true)}
                >
                Add New
            </Button>

            <AlertDialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
                <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Add New User</AlertDialogTitle>
                    <AlertDialogDescription>
                    Enter the details for the new user.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleAddNewUser)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                            <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                            <Input type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction type="submit">Add User</AlertDialogAction>
                    </AlertDialogFooter>
                    </form>
                </Form>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}