'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

interface User {
  id: string
  name: string
}

interface UserListProps {
  title: string
  description: string
  users: User[]
}

const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address")
})

type UserFormValues = z.infer<typeof userSchema>

export default function UserList({ title, description, users}: UserListProps) {

  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);

  const handleAddNew = (newUser: { name: string; email: string }) => {

  }
  const handleUserClick = (userId: string) => {

  }

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: ""
    }
  })

  const handleAddNewUser = (values: UserFormValues) => {
    handleAddNew(values)
    setIsAddUserDialogOpen(false)
    form.reset()
  }

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
        <Button
          variant="outline"
          className="h-auto py-2 px-4 justify-start text-primary"
          onClick={() => setIsAddUserDialogOpen(true)}
        >
          Add New
        </Button>
      </div>

      <div className="w-full border-t border-gray-300 mt-8"></div>

      <AlertDialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Add New User</AlertDialogTitle>
            <AlertDialogDescription>
              Enter the details for the new user.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAddNewUser)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction type="submit">Add User</AlertDialogAction>
              </AlertDialogFooter>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

