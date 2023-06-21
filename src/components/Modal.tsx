import { signIn } from "next-auth/react"

export default function Modal(
    {
        setShow,
        show,
        children,
    }:{
        setShow: (show: boolean) => void
        show: boolean
        children: React.ReactNode
    }){

    if (show) return (
        <div className="absolute top-0 left-0 w-screen h-screen flex items-center justify-center">
            <div className="absolute z-20 top0 left-0 w-screen h-screen flex items-center justify-center bg-background bg-opacity-90" onClick={()=>{setShow(false)}} />
            <div className="z-30">

            {children}
            </div>
        </div>
    )
}

export const SignInModal = ({ setShow, show }: { setShow: (show: boolean) => void, show: boolean }) => {
    if(show) return (
            <div className="absolute top-0 left-0 w-screen h-screen flex items-center justify-center">
            <div className="absolute z-20 top0 left-0 w-screen h-screen flex items-center justify-center bg-background bg-opacity-90" onClick={()=>{setShow(false)}} />
            <div className="z-30">
            <div className="w-1/3 z-20 h-8/12  rounded-lg p-3 border border-gray-500 bg-background">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-3xl">You must be signed in to view this page</h1>
                    <button className="btn" onClick={() => signIn()}>Sign In</button>
                </div>
            </div>
            </div>
        </div>
    )
}