"use client"
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronRight } from 'lucide-react'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import { Bill, User } from "./models";
import { useState } from "react"
import { fetchBillDetails } from "@/app/(server_actions)/actions"
import { useToast } from "@/hooks/use-toast"

interface BillUnit{
    amount : number,
    billbookUserId : string
}

interface ModifiedUser{
    id : string,
    name : string,
    amount : number | undefined
}

export default function AlertDialogUpdateBillButton({users,billId}:{users:User[],billId: string}){

    // const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [modifiedUsers, setModifiedUsers] = useState<ModifiedUser[] | undefined>();
    const {toast} = useToast();
    
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        // console.log("Form submitted", selectedBill)
        handleCloseDialog()
    }

    const handleOpenDialog = async () => {
    // setSelectedBill(!)
    const billUnitsResponse = await fetchBillDetails(billId);

    if(!billUnitsResponse.success){
        toast({
            title: "Error",
            description: "Something went wrong",
        });
    }

    const modifiedusers = users.map((user)=>{
        return {
            ...user,
            amount : billUnitsResponse.billUnits?.find((bill)=>bill.billbookUserId==user.id)?.amount
        }
    })

    setModifiedUsers(modifiedusers);
    setIsCreateDialogOpen(true);

    }

    const handleCloseDialog = () => {
    
    setIsCreateDialogOpen(false);
    
    }

    return(
        <>
            <Button variant="ghost" size="sm" onClick={() => handleOpenDialog()} className="float-right">
                  <ChevronRight className="h-4 w-4" />
            </Button>
            <AlertDialog open={isCreateDialogOpen} onOpenChange={handleCloseDialog}>
                <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Bill Details</AlertDialogTitle>
                    <AlertDialogDescription>
                    Update the amounts for each user in this bill.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <form onSubmit={handleSubmit}>
                    {modifiedUsers ? (
                    <div className="grid gap-4 py-4">
                        {modifiedUsers.map((user) => (
                        <div key={user.id} className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor={`amount-${user.id}`} className="text-right">
                            {user.name}
                            </Label>
                            <Input
                            id={`amount-${user.id}`}
                            type="number"
                            defaultValue={user.amount}
                            className="col-span-3"
                            disabled
                            />
                        </div>
                        ))}
                    </div>
                    ) : "No Users in this bill"}
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    {/* <AlertDialogAction type="submit">Update</AlertDialogAction> */}
                    </AlertDialogFooter>
                </form>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )

}