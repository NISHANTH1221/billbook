export interface BillBookPreview {
    billbookId: string,
    title: string,
    lastUpdated : Date,
    description : string
}

export interface User {
  id: string
  name: string
}

export interface Bill{
  billId : string,
  description : string,
  amount : number,
  lastUpdated : Date,
  createdAt : Date,
  billbookId : string,
}

export interface BillTableProps {
  bills: Bill[],
  users: User[],
  billbookId : string
}