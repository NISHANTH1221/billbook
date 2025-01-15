'use client'

import { useState } from 'react'
import BillTable from '../../_components/bill-table'
import UserList from '@/components/user-list'
import { getServerSession } from 'next-auth'
import nextOptions from '@/app/api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation'
import prisma from '../../../../../db/db'
import { useToast } from '@/hooks/use-toast'

export default async function BillBookDetailViewPage({params}:{params : { id : string }}) {
  // const [users, setUsers] = useState([
  //   { id: '1', name: 'Alice Johnson', amount: 0, email: 'alice@example.com' },
  //   { id: '2', name: 'Bob Smith', amount: 0, email: 'bob@example.com' },
  //   { id: '3', name: 'Charlie Brown', amount: 0, email: 'charlie@example.com' },
  //   { id: '4', name: 'Diana Ross', amount: 0, email: 'diana@example.com' },
  // ])

  // const [bills, setBills] = useState([
  //   {
  //     id: '1',
  //     description: 'Dinner',
  //     amount: 100,
  //     createdAt: '2023-05-01T12:00:00Z',
  //     updatedAt: '2023-05-01T12:00:00Z',
  //     users: [
  //       { id: '1', name: 'Alice Johnson', amount: 25 },
  //       { id: '2', name: 'Bob Smith', amount: 25 },
  //       { id: '3', name: 'Charlie Brown', amount: 25 },
  //       { id: '4', name: 'Diana Ross', amount: 25 },
  //     ],
  //   },
  //   {
  //     id: '2',
  //     description: 'Movie night',
  //     amount: 50,
  //     createdAt: '2023-05-02T18:30:00Z',
  //     updatedAt: '2023-05-02T18:30:00Z',
  //     users: [
  //       { id: '1', name: 'Alice Johnson', amount: 12.5 },
  //       { id: '2', name: 'Bob Smith', amount: 12.5 },
  //       { id: '3', name: 'Charlie Brown', amount: 12.5 },
  //       { id: '4', name: 'Diana Ross', amount: 12.5 },
  //     ],
  //   },
  // ])

  const { toast } = useToast();

  const session = await getServerSession(nextOptions);

  if(!session || !session.user.userId){
    return redirect('/login')
  }

  const billBookId : string = params.id ;


  const isValidBillBookId : boolean = await checkIsValidBillBookId(billBookId,session.user.userId);

  if(!isValidBillBookId){
    toast({
      title : "BillBook Id is invalid",
      description : "The BillBookId in the Url i Invalid"
    })
    return redirect("/billbooks");
  }

  const users =  await getUsersInBillBook(billBookId);
  
  const bills = await getBillsForBillBook(billBookId);

  const handleAddNew = (newUser: { name: string; email: string }) => {
  
  }

  const handleUserClick = (userId: string) => {
    // Implement your user click logic here
    console.log(`Clicked user with id: ${userId}`)
  }

  const handleCreateNewBill = (newBill: Omit<typeof bills[0], 'id' | 'createdAt' | 'updatedAt'>) => {
    
  }

  return (
    <div className="min-h-screen bg-background p-8 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        <UserList
          title="Bill Management"
          description="Manage your bills and split expenses with your friends"
          users={users}
          onAddNew={handleAddNew}
          onUserClick={handleUserClick}
        />
        <BillTable 
          bills={bills} 
          onCreateNewBill={handleCreateNewBill}
        />
      </div>
    </div>
  )
}


async function checkIsValidBillBookId(id:string,userId : string){

  const isValidBillBookId = await prisma.billBook.findUnique({
    where : {
      billbookId : id,
      createdby : userId
    }
  });

  if(!isValidBillBookId) return false;
  
  return true;
}

async function getUsersInBillBook(id: string){
    const users = await prisma.billBookUser.findMany({
      where : {
      billbookId : id
      }
    });

    return users.map((user)=>{
      return {
        id : user.billbookUserId,
        name : user.name
      }
    });
}

async function getBillsForBillBook(billBookId : string){
  const bills = await prisma.bill.findMany({
    where : {
      billbookId : billBookId
    }
  })

  return bills;
}