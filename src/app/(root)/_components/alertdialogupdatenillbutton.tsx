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


export default function AlertDialogUpdateBillButton({users,bill}:{users:User[],bill: Bill}){

    const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
    

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        console.log("Form submitted", selectedBill)
        handleCloseDialog()
      }

      const handleOpenDialog = (bill: Bill) => {
        setSelectedBill(bill)
      }
    
      const handleCloseDialog = () => {
        setSelectedBill(null)
      }

    return(
        <>
            <Button variant="ghost" size="sm" onClick={() => handleOpenDialog(bill)} className="float-right">
                  <ChevronRight className="h-4 w-4" />
            </Button>
            <AlertDialog open={selectedBill !== null} onOpenChange={handleCloseDialog}>
                <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Bill Details</AlertDialogTitle>
                    <AlertDialogDescription>
                    Update the amounts for each user in this bill.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <form onSubmit={handleSubmit}>
                    {selectedBill && (
                    <div className="grid gap-4 py-4">
                        {users.map((user) => (
                        <div key={user.id} className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor={`amount-${user.id}`} className="text-right">
                            {user.name}
                            </Label>
                            <Input
                            id={`amount-${user.id}`}
                            type="number"
                            defaultValue={0}
                            className="col-span-3"
                            />
                        </div>
                        ))}
                    </div>
                    )}
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction type="submit">Save changes</AlertDialogAction>
                    </AlertDialogFooter>
                </form>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )

}