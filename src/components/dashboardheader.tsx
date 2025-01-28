"use client"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
export default function Header(){
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  // const handleProfileClick = () => {
  //   console.log("Profile clicked")
  // }

  const handleLogout = () => {
    signOut({callbackUrl:"/"})
  }

  const handleLogoClick = () =>{
    router.push("/billbooks")

  }

    return(
        <header className="bg-white shadow-sm sticky z-50 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900 cursor-pointer" onClick={handleLogoClick}>BillBook</h1>
          </div>
          <div className="flex items-center">
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="relative rounded-full border-2 border-gray-200 hover:border-gray-300">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Open user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {/* <DropdownMenuItem onClick={handleProfileClick}>
                  My Profile
                </DropdownMenuItem> */}
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    )
}