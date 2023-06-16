import Link from "next/link"
import { type ReactNode } from "react"
import React from "react"
import Image from "next/image"


const Layout = ({ children } : {children: ReactNode}) => {

    return (
        <main>

        <div className="navbar bg-base-100">
            <div className="flex-1">
                <Link href="/" className="btn normal-case text-xl">Psuedo Crowed</Link>
            </div>
            <div className="flex-none">
                <button className="">
                <Image src={'/favico.ico'} alt="logo" width={50} height={50} className="rounded-lg"  />
                </button>
            </div>
        </div>
        {children}
        </main>
    )

}

export default Layout

