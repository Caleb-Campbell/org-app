import Link from "next/link"
import { type ReactNode } from "react"
import React from "react"
import Image from "next/image"
import Modal from "./Modal"
import { signIn } from "next-auth/react"


const Layout = ({ needsAuth = false, session, children } : {needsAuth?: boolean, session?: any, children: ReactNode}) => {

    if(needsAuth && !session) return (
        <Modal show={true} setShow={() => {}}>
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-3xl">You must be signed in to view this page</h1>
                <button className="btn" onClick={() => signIn()}>Sign In</button>
            </div>
        </Modal>
    )


    return (
        <main>

        <div className="navbar bg-base-100">
            <div className="flex-1">
                <Link href="/" className="btn normal-case text-xl">Psuedo Crowed</Link>
            </div>
            <div className="flex-none">
                <Link href='/crow'>
                <Image src={'/favico.ico'} alt="logo" width={50} height={50} className="rounded-lg"  />
                </Link>
            </div>
        </div>
        {children}
        </main>
    )

}

export default Layout

