
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

    return (
        <div className="absolute top-0 left-0 w-screen h-screen flex items-center justify-center">
            <div className="absolute z-10 top0 left-0 w-screen h-screen flex items-center justify-center bg-background bg-opacity-90" onClick={()=>{setShow(false)}} />
            {children}
        </div>
    )
}