import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronRight } from 'lucide-react'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"

interface User {
  id: string
  name: string
  amount: number
}

interface Bill{
  billId : string,
  description : string,
  amount : number,
  lastUpdated : Date,
  createdAt : Date,
  billbookId : string,
}

interface BillTableProps {
  bills: Bill[],
  onCreateNewBill: (newBill: Omit<Bill, 'id' | 'createdAt' | 'updatedAt'>) => void
}

const createBillSchema = z.object({
  description: z.string().min(1, "Description is required"),
  amount: z.number().min(0, "Amount must be a positive number"),
  users: z.array(z.object({
    id: z.string(),
    name: z.string(),
    amount: z.number().min(0, "Amount must be a positive number")
  }))
})

type CreateBillFormValues = z.infer<typeof createBillSchema>

export default function BillTable({ bills, onCreateNewBill }: BillTableProps) {
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const form = useForm<CreateBillFormValues>({
    resolver: zodResolver(createBillSchema),
    defaultValues: {
      description: "",
      amount: 0,
      users: users.map(user => ({ ...user, amount: 0 }))
    }
  })

  const handleOpenDialog = (bill: Bill) => {
    setSelectedBill(bill)
  }

  const handleCloseDialog = () => {
    setSelectedBill(null)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Handle form submission here
    console.log("Form submitted", selectedBill)
    handleCloseDialog()
  }

  const handleCreateNewBill = (values: CreateBillFormValues) => {
    onCreateNewBill(values)
    setIsCreateDialogOpen(false)
    form.reset()
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="flex justify-end mb-4">
        <Button onClick={() => setIsCreateDialogOpen(true)}>Create a new bill</Button>
      </div>
      <Table className="w-full border-collapse shadow-sm">
        <TableHeader>
          <TableRow className="bg-muted">
            <TableHead className="font-semibold text-muted-foreground">Description</TableHead>
            <TableHead className="font-semibold text-muted-foreground">Bill Amount</TableHead>
            <TableHead className="font-semibold text-muted-foreground">Created At</TableHead>
            <TableHead className="font-semibold text-muted-foreground">Updated At</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bills.map((bill) => (
            <TableRow key={bill.id} className="border-b transition-colors hover:bg-muted/50">
              <TableCell className="font-medium">{bill.description}</TableCell>
              <TableCell>${bill.amount.toFixed(2)}</TableCell>
              <TableCell suppressHydrationWarning={true}>{new Date(bill.createdAt).toLocaleDateString()}</TableCell>
              <TableCell suppressHydrationWarning={true}>{new Date(bill.updatedAt).toLocaleDateString()}</TableCell>
              <TableCell>
                <Button variant="ghost" size="sm" onClick={() => handleOpenDialog(bill)} className="float-right">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

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
                {selectedBill.users.map((user) => (
                  <div key={user.id} className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor={`amount-${user.id}`} className="text-right">
                      {user.name}
                    </Label>
                    <Input
                      id={`amount-${user.id}`}
                      type="number"
                      defaultValue={user.amount}
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
                        onChange={e => field.onChange(parseFloat(e.target.value))} 
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
                                    onChange={e => field.onChange(parseFloat(e.target.value))} 
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
    </div>
  )
}

