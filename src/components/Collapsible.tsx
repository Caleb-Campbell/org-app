const Collapsible = ({ children, title, ...props }
    :{
        children: React.ReactNode,
        title: string,
        props?: any
    }
    
    ) => {
    return (
        <div className="collapse bg-cardground bg-opacity-30">
            <input type="checkbox" /> 
            <div className="collapse-title text-xl font-medium">
                {title}
            </div>
            <div className="collapse-content px-3"> 
                {children}
            </div>
        </div>
    ) 
}

export default Collapsible