import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BillTableProps } from "./models"
import AlertDialogBillButton from "./alertdialogbillbutton"
import AlertDialogUpdateBillButton from "./alertdialogupdatenillbutton"

export default function BillTable({ bills , users, billbookId  }: BillTableProps  ) {
  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="flex justify-end mb-4">
        <AlertDialogBillButton users={users} billbookId={billbookId}/>
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
            <TableRow key={bill.billId} className="border-b transition-colors hover:bg-muted/50">
              <TableCell className="font-medium">{bill.description}</TableCell>
              <TableCell>${bill.amount.toFixed(2)}</TableCell>
              <TableCell suppressHydrationWarning={true}>{new Date(bill.createdAt).toLocaleDateString()}</TableCell>
              <TableCell suppressHydrationWarning={true}>{new Date(bill.lastUpdated).toLocaleDateString()}</TableCell>
              <TableCell>
                <AlertDialogUpdateBillButton bill={bill} users={users} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      
    </div>
  )
}

