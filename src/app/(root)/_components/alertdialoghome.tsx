"use client"

import { Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import axiosInstance from '../../../../axios/axios'
import { useRouter } from 'next/navigation'


export default function AlertDialogHome() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newBillBookTitle, setNewBillBookTitle] = useState("");
    const [newBillBookDescription, setNewBillBookDescription] = useState("");
    const { toast } = useToast();
    const router = useRouter();


    // const handleAddBillBook = () => {
    //     console.log("button clicked")
    // }

    const handleCreateBillBook = async () => {
        if (newBillBookTitle.trim() === "" && newBillBookDescription.trim() === "") {
            toast({
            title: "Error",
            description: "Please enter a title for the new bill book.",
            variant: "destructive",
            });
        }else{
            const response = await axiosInstance.post("/api/v1/createbillbook",{
              title: newBillBookTitle,
              description: newBillBookDescription
            });
            setIsDialogOpen(false);
            setNewBillBookTitle("");
            setNewBillBookDescription("");
            if(response.status==200){
                toast({
                    title: "Success",
                    description: "New bill book created successfully. You can now add bills to your book.",
                });
                router.push("/billbooks")
            }else{
                router.push("/");
            }
        }
    }
    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Add a new bill book
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create a New Bill Book</DialogTitle>
                  <DialogDescription>
                    Enter a title for your new bill book. Click create when you're done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-center">
                      Title
                    </Label>
                    <Input
                      id="title"
                      value={newBillBookTitle}
                      onChange={(e) => setNewBillBookTitle(e.target.value)}
                      className="col-span-3"
                      placeholder="e.g., Personal Expenses"
                    />
                  </div>
                </div>
                <div className="grid gap-4 py-4 pt-1">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-center">
                      Description
                    </Label>
                    <Input
                      id="title"
                      value={newBillBookDescription}
                      onChange={(e) => setNewBillBookDescription(e.target.value)}
                      className="col-span-3"
                      placeholder="e.g., Expense of month December"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleCreateBillBook}>Create</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
    )
}