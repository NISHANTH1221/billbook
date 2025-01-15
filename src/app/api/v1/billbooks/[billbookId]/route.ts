import nextOptions from "@/app/api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"


export const GET = async() =>{
    const session = await getServerSession(nextOptions);

    if(!session){
        return NextResponse.redirect(new URL('/login', import.meta.url))
    }

    const bill = [
        {
          id: '1',
          description: 'Dinner',
          amount: 100,
          createdAt: '2023-05-01T12:00:00Z',
          updatedAt: '2023-05-01T12:00:00Z',
          users: [
            { id: '1', name: 'Alice Johnson', amount: 25 },
            { id: '2', name: 'Bob Smith', amount: 25 },
            { id: '3', name: 'Charlie Brown', amount: 25 },
            { id: '4', name: 'Diana Ross', amount: 25 },
          ],
        },
        {
          id: '2',
          description: 'Movie night',
          amount: 50,
          createdAt: '2023-05-02T18:30:00Z',
          updatedAt: '2023-05-02T18:30:00Z',
          users: [
            { id: '1', name: 'Alice Johnson', amount: 12.5 },
            { id: '2', name: 'Bob Smith', amount: 12.5 },
            { id: '3', name: 'Charlie Brown', amount: 12.5 },
            { id: '4', name: 'Diana Ross', amount: 12.5 },
          ],
        },
      ];


      return NextResponse.json({
        bills:bills
      });

}