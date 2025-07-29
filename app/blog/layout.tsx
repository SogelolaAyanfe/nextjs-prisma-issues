'use client'
import Navbar from 'components/Navbar'


export default function Layout({ children }: any) {
    return (
        <div>
            <Navbar />
            <main>{children}</main>
        </div>
    )
}
