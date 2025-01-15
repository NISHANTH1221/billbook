import Header from "@/components/header";

export default function AppLayout ({children} : {children : React.ReactNode}){
    return(
        <main className="w-[100%] p-1">
            <Header />
            {children}
        </main>
    )
} 