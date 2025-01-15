"use client"
export default function ClientRenderDateComponent ( {date} : {date : Date}) {
    return(
        <span suppressHydrationWarning={true}>
            {
                new Date(date).toLocaleString()
            }
        </span>
    )
}