"use client"
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useState } from 'react'
import { User } from "./models"
import { useToast } from "@/hooks/use-toast"
import { createBillUnitsForBill, createNewBill, deleteBill } from "@/app/(server_actions)/actions"
import { useRouter } from "next/navigation"



type CreateBillFormValues = z.infer<typeof createBillSchema>



const createBillSchema = z.object({
    description: z.string().min(1, "Description is required"),
    amount: z.number().min(0, "Amount must be a positive number"),
    users: z.array(z.object({
      id: z.string(),
      name: z.string(),
      amount: z.number().min(0, "Amount must be a positive number")
    }))
  })

export default function AlertDialogBillButton({users,billbookId}:{users : User[],billbookId: string}){
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const { toast } = useToast();
    const router = useRouter();
  
    const form = useForm<CreateBillFormValues>({
      resolver: zodResolver(createBillSchema),
      defaultValues: {
        description: "",
        amount: 0,
        users: users.map(user => ({ ...user, amount: 0 }))
      }
    })
  
    
  
    const handleCreateNewBill = async (values: CreateBillFormValues) => {
      let total_amount: number = values.amount;

      const users = values.users;

      let total_users_amount: number = 0;

      for(let i=0;i<users.length;i++){
        total_users_amount += users[i].amount
      }


      if(total_amount!=total_users_amount){
        toast({
            title  : "Bill is not created",
            description:"Amount and Total Users amount must be equal",
            variant :"destructive"
        })
      }else{
        const response = await createNewBill(values.description,total_amount,billbookId);

        if(response.success){
            if(response.bill){
                let modified_user_object = users.map((user)=>{
                    return {
                      billbookUserId : user.id,
                      amount: user.amount,
                      billId: response.bill.billId
                    }
                  });
                const billUnitsResponse = await createBillUnitsForBill(modified_user_object);   

                if(billUnitsResponse){
                    toast({
                        title  : "Bill is created",
                        description:"Bill is created successfully",
                    })
                }
                else{
                    const billDeleteResponse = await deleteBill(response.bill.billId);
                    // should implement it as a transaction bill creation and bill units creation
                    router.refresh();
                    toast({
                        title  : "Bill is not created",
                        variant: "destructive"
                    });
                }
            }else{
                toast({
                    title  : "Bill is not created",
                    variant: "destructive"
                })
            }
        }else{
            toast({
                title  : "Bill is not created",
                description:"Bill couldnt be created because of internal error",
                variant :"destructive"
            })
        }
      }
      setIsCreateDialogOpen(false)
      form.reset()
    }
  
    return(
        <>
            <Button onClick={() => setIsCreateDialogOpen(true)}>Create a new bill</Button>
            

            <AlertDialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <AlertDialogContent className="max-w-md w-full p-4">
                <AlertDialogHeader className="space-y-2">
                    <AlertDialogTitle>Create a New Bill</AlertDialogTitle>
                    <AlertDialogDescription>
                    Enter the details for the new bill.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleCreateNewBill)} className="space-y-3">
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                            <Input {...field} className="h-8" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Total Amount</FormLabel>
                            <FormControl>
                            <Input 
                                type="number" 
                                {...field} 
                                onChange={e => e.target.value ? field.onChange(parseFloat(e.target.value)) : field.onChange(Number("0")) } 
                                className="h-8" 
                            />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <Card>
                        <CardContent className="p-3">
                        <Label className="mb-2 block">User Amounts</Label>
                        <ScrollArea className="h-[150px] pr-4">
                            <div className="space-y-2">
                            {users.map((user, index) => (
                                <FormField
                                key={user.id}
                                control={form.control}
                                name={`users.${index}.amount`}
                                render={({ field }) => (
                                    <FormItem>
                                    <div className="flex items-center space-x-2">
                                        <FormLabel className="w-1/3 text-sm">{user.name}</FormLabel>
                                        <FormControl>
                                        <Input 
                                            type="number" 
                                            {...field} 
                                            onChange={e => e.target.value ? field.onChange(parseFloat(e.target.value)): field.onChange(parseFloat("0"))} 
                                            className="h-8 w-2/3" 
                                        />
                                        </FormControl>
                                    </div>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                            ))}
                            </div>
                        </ScrollArea>
                        </CardContent>
                    </Card>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction type="submit">Create Bill</AlertDialogAction>
                    </AlertDialogFooter>
                    </form>
                </Form>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}