import BillTable from '../../_components/bill-table'
import UserList from '@/app/(root)/_components/user-list'
import { getServerSession } from 'next-auth'
import nextOptions from '@/app/api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation'
import prisma from '../../../../../db/db'
import UsersAnalyticsComponent from '../../_components/UsersAnalyticsComponent'
import { getBillsForBillBook, getUsersInBillBook } from '@/app/(server_actions)/actions'

export default async function BillBookDetailViewPage({ params }:{params : { billBookId : string }}) {

  const session = await getServerSession(nextOptions);

  if(!session || !session.user.userId){
    return redirect('/login')
  }

  const { billBookId } : {billBookId : string } = await params ;

  const billBook = await checkIsValidBillBookId(billBookId,session.user.userId);

  if(!billBook){
    return redirect("/billbooks");
  }

  const users =  await getUsersInBillBook(billBookId);
  
  const bills = await getBillsForBillBook(billBookId);

  return (
    <div className="min-h-screen bg-background p-8 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        <UserList
          title={billBook.title}
          description={billBook.description}
          users={users}
          billbookId={billBookId}
        />
        <UsersAnalyticsComponent
        users={users}
        billbookId={billBookId}
        />
        <BillTable 
          bills={bills}
          users={users} 
          billbookId={billBookId}
        />
      </div>
    </div>
  )
}


async function checkIsValidBillBookId(id:string,userId : string){

  const billBook = await prisma.billBook.findUnique({
    where : {
      billbookId : id,
      createdby : userId
    }
  });

  return billBook
}

