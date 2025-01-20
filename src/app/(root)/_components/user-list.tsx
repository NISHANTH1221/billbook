import { Button } from "@/components/ui/button"
import { AlertDialogUser } from "./alertdialogusers"

interface User {
  id: string
  name: string
}

interface UserListProps {
  title: string
  description: string
  users: User[]
  billbookId : string
}



export default function UserList({ title, description, users , billbookId }: UserListProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-gray-600">{description}</p>
      </div>
      
      <div className="w-full border-t border-gray-300 my-8"></div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
        {users.map((user) => (
          <Button
            key={user.id}
            variant="outline"
            className="h-auto py-2 px-4 justify-start"
          >
            {user.name}
          </Button>
        ))}

        <AlertDialogUser billbookId = {billbookId}/>

      </div>

    </div>
  )
}

