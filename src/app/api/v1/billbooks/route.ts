import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest){
    const dummyBillBooks = [
        { id: 1, title: "Personal Expenses", lastUpdated: "2023-05-15T14:30:00Z" },
        { id: 2, title: "Business Expenses", lastUpdated: "2023-05-14T09:45:00Z" },
        { id: 3, title: "Project X Budget", lastUpdated: "2023-05-13T16:20:00Z" },
        { id: 4, title: "Home Renovation", lastUpdated: "2023-05-12T11:15:00Z" },
        { id: 5, title: "Vacation Planning", lastUpdated: "2023-05-11T08:30:00Z" },
      ]
    return NextResponse.json({
        dummyBillBooks
    })

} 