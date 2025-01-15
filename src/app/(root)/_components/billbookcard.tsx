"use client"

interface BillBookPreview {
    billbookId: string
    title: string,
    lastUpdated : Date
}

import ClientRenderDateComponent from "@/components/ClientDateComponent"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, Calendar } from 'lucide-react'
import { useRouter } from "next/navigation"


export default function BillBookCard ({book} : {book : BillBookPreview}){
    const router = useRouter();
    
    const handleBillBookClick = (id: string) => {
        router.push(`/billbooks/${id}`)
    }

    return(
        <Card 
            key={book.billbookId} 
            className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 bg-white border-l-4 border-l-primary"
            onClick={() => handleBillBookClick(book.billbookId)}
        >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-semibold">{book.title}</CardTitle>
            <ChevronRight className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
            <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-2 h-4 w-4" />
                <span>Last updated: <ClientRenderDateComponent date={book.lastUpdated}/></span>
            </div>
            </CardContent>
        </Card>
    )
}