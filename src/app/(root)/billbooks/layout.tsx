import Header from "@/components/dashboardheader";

export default function AppLayout ({children} : {children : React.ReactNode}){
    return(
        <main className="w-[100%] p-1">
            <Header />
            {children}
        </main>
    )
} 