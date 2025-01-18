import Link from 'next/link'
import { ArrowRight, DollarSign, Users, Calendar, Home, Users2, Briefcase, PiggyBank, BarChart2, SplitSquareVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getServerSession } from 'next-auth'
import nextOptions from '../api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation'

export default async function LandingPage() {
  const session = await getServerSession(nextOptions);

  if(session) return redirect("/billbooks")
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <DollarSign className="h-6 w-6" />
          <span className="ml-2 text-lg font-bold">BillBook</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Pricing
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            About
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-white to-gray-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Simplify Group Expenses with BillBook
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Effortlessly manage shared expenses, track bills, and split costs among friends, roommates, or small businesses.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/signup"><Button size="lg">Get Started</Button></Link>
                <Button variant="outline" size="lg">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Key Features
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 border-gray-200 p-4 rounded-lg shadow-sm">
                <Users className="h-12 w-12 text-blue-500" />
                <h3 className="text-xl font-bold">Multiple Users</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Add multiple users to each bill book and manage shared expenses effortlessly.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-200 p-4 rounded-lg shadow-sm">
                <SplitSquareVertical className="h-12 w-12 text-green-500" />
                <h3 className="text-xl font-bold">Expense Segregation</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Easily split bill amounts among bill book members for fair expense distribution.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-200 p-4 rounded-lg shadow-sm">
                <BarChart2 className="h-12 w-12 text-purple-500" />
                <h3 className="text-xl font-bold">Collaborative Tracking</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Keep everyone in the loop with real-time updates on shared expenses and balances.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Use Cases
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((useCase, index) => (
              <Card key={index} className="flex flex-col h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    {useCase.icon}
                  </div>
                  <CardTitle>{useCase.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{useCase.description}</p>
                </CardContent>
              </Card>
            ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Simplify Your Expense Management?
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Join BillBook today and start managing your shared expenses with ease.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Link href="/signup">
                    <Button type="submit">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </form>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  By signing up, you agree to our <Link className="underline underline-offset-2" href="#">Terms & Conditions</Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2023 BillBook. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

const useCases = [
  {
    title: "Group Expense Tracking",
    description: "Perfect for friends who regularly dine out or go on trips together. Record bills, split expenses, and track individual contributions.",
    icon: <Users className="w-6 h-6 text-primary" />
  },
  {
    title: "Small Business Credit",
    description: "Ideal for small businesses to manage customer accounts, track credit transactions, and settle payments effectively.",
    icon: <DollarSign className="w-6 h-6 text-primary" />
  },
  {
    title: "Event Budget Management",
    description: "Organize events like weddings or community gatherings. Track all expenditures and distribute costs among contributors transparently.",
    icon: <Calendar className="w-6 h-6 text-primary" />
  },
  {
    title: "Roommate Expenses",
    description: "Simplify recording shared expenses for utilities, groceries, and rent among roommates. Calculate individual shares easily.",
    icon: <Home className="w-6 h-6 text-primary" />
  },
  {
    title: "Group Activities",
    description: "Great for clubs, sports teams, or community groups to track shared expenses like equipment, transportation, or meals.",
    icon: <Users2 className="w-6 h-6 text-primary" />
  },
  {
    title: "Employee Expenses",
    description: "Small organizations can easily track and reimburse employees for shared business expenses like travel or meals.",
    icon: <Briefcase className="w-6 h-6 text-primary" />
  },
  {
    title: "Family Budgeting",
    description: "Help families maintain a record of shared household expenses, ensuring all members are aware of spending and can contribute accordingly.",
    icon: <PiggyBank className="w-6 h-6 text-primary" />
  }
]

