export const Button = ({ children, className, ...props }
    :{
        children: React.ReactNode,
        className: string,
        props: any
    }
    ) => (
    <button
        className={`btn border border-white hover:outline ${className}`}
        {...props}
    >
        {children}
    </button>
    )
