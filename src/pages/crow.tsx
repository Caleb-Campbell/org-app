import Layout from "~/components/layout"
import React, { useState } from "react"
import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { PlusOneOutlined } from "@material-ui/icons";

type PreflightData = {
    id: number,
    question: string,
    answer: string,
    isComplete: boolean,
}

type StepData = {
    id: number,
    title: string,
    snippet: string,
}

type CrowData = {
    id: number,
    issue: string,
    isOpen: boolean,
    preflight: PreflightData[],
    steps: StepData[],
}

const Crow = () => {

    const data: CrowData[] = [
        {
            id: 1,
            issue: "Add welcome email for new users",
            isOpen: true,
            preflight: [
                {
                    id: 1,
                    question: 'Why does the user need this feature?',
                    answer: 'So they can feel welcomed to the app',
                    isComplete: false,
                },
                {
                    id: 2,
                    question: 'Who requested this feature?',
                    answer: 'Bob the client',
                    isComplete: false,
                },
            ],
            steps: [
                {
                    id: 1,
                    title: 'Created email template',
                    snippet: 'const emailTemplate = () => {...}'
                },
                {
                    id: 2,
                    title: 'ran yarn install',
                    snippet: 'yarn install'
                },
            ]
            
        }
    ]


    const [selectedCrow, setSelectedCrow] = useState<CrowData | undefined>(undefined)
    const [showNewCrowModal, setShowNewCrowModal] = useState<boolean>(false)
    const [crows, setCrows] = useState<CrowData[]>([...data])

    const createCrow = (title: string) => {
        const newCrow: CrowData = {
            id: 1,
            issue: title,
            isOpen: true,
            preflight: [
                {
                    id: 1,
                    question: 'Why does the user need this feature?',
                    answer: 'So they can feel welcomed to the app',
                    isComplete: false,
                },
                {
                    id: 2,
                    question: 'Who requested this feature?',
                    answer: 'Bob the client',
                    isComplete: false,
                },
            ],
            steps: [],
        }

        setCrows([...crows, newCrow])
    }

    return (
        <Layout>
             <div className="grid grid-cols-3 gap-64 p-32">
                <button onClick={()=>setShowNewCrowModal(!showNewCrowModal)} className="w-9 h-9 rounded-full flex items-center justify-center absolute top-3 mx-auto left-1/2">
                    <i className={`scale-[2] transition-transform ${showNewCrowModal ? 'rotate-45' : ''}`} aria-hidden="true">+</i>
                </button>
             <CrowEditor setShow={setSelectedCrow} crow={selectedCrow}  />
             <NewCrowModal createCrow={createCrow} show={showNewCrowModal} setShow={setShowNewCrowModal} />
                {crows.map((item, index) => (
                    <div onClick={()=>setSelectedCrow(item)} className="p-10 cursor-pointer bg-cardground bg-opacity-30 rounded-lg shadow-md hover:shadow-lg hover:translate-x-[2px] hover:translate-y-[2px] transition-transform indicator" key={item.id}>
                            <span className={`badge badge-success ${item.isOpen ? 'indicator-item' : ''}`}></span>
                        <p className="text-3xl">{item.issue}</p>
                    </div>
                ))}
            </div>
        </Layout>
    )
}

export default Crow

const CrowEditor = ({
    crow,
    setShow,
}:{
    crow: CrowData | undefined
    setShow: (crow: CrowData | undefined) => void
}) => {
    const [code, setCode] = useState<string>("")
    const [title, setTitle] = useState<string>("")

    if (crow) return (
        <div className="absolute top-0 left-0 w-screen h-screen flex items-center justify-center">
            <div className="absolute z-10 top-0 left-0 w-screen h-screen flex items-center justify-center bg-background bg-opacity-90" onClick={()=>{setShow(undefined)}} />
                    <p className="text-center text-2xl z-20 uppercase bg-background rounded-lg p-4 absolute border border-gray-500 top-10 mx-auto">{crow.issue}</p>
                <div className="w-3/5 z-20 h-11/12 overflow-y-scroll rounded-lg p-10 border border-gray-500 bg-background">
                    <div className="flex flex-col gap-4 w-10/12 mx-auto">
                        <div className="flex flex-col gap-4 ">
                            <p className="text-2xl">Preflight</p>
                            {crow.preflight.map((item, index) => (
                                <div className="flex flex-col gap-4" key={item.id}>
                                    <div className="form-control ">
                                        <label className="label">
                                            <span className="label-text">{item.question}</span>
                                        </label>
                                        <textarea className="input input-bordered mx-auto w-full h-9 rounded-none focus:outline-none bg-cardground bg-opacity-70 p-1 px-3" />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col gap-4">
                            <p className="text-2xl">Steps</p>
                            <button className="bg-cardground h-9 ml-2 px-3 rounded">Add Step</button>
                            {crow.steps.map((item, index) => (
                            <div className="flex flex-col gap-4" key={item.id}>
                            <p>{item.title}</p>
                            <CodeMirror
                            value={code}
                            width="500px"
                            height="30vh"
                            minWidth="100%"
                            minHeight="30vh"
                            extensions={[
                                markdown({ base: markdownLanguage, codeLanguages: languages }),
                            ]}
                            onChange={(value) => setCode(value)}
                            className="codemirror-container"
                            />
                          </div>
                            ))}
                        </div>
                    </div>
                </div>
        </div>
    )
}

const NewCrowModal = ({
    setShow,
    show,
    createCrow,
}:{
    setShow: (showNewCrowModal: boolean) => void
    show: boolean
    createCrow: (title: string) => void
}) => {
    const [title, setTitle] = useState<string>("")

    if (show) return (
        <div className="absolute top-0 left-0 w-screen h-screen flex items-center justify-center">
            <div className="absolute z-10 top0 left-0 w-screen h-screen flex items-center justify-center bg-background bg-opacity-90" onClick={()=>{setShow(false)}} />
            <div className="w-1/3 z-20 h-8/12  rounded-lg p-3 border border-gray-500 bg-background">
                <label>{`What's your issue?`}</label>
                <div className="flex">
                <input className="input input-bordered w-10/12 h-9 rounded-none focus:outline-none bg-cardground bg-opacity-70 p-1 px-3" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} />
                <button className="bg-cardground h-9 ml-2 px-3 rounded" onClick={()=>{
                    setShow(false)
                    createCrow(title)
                    }}>Create</button>
                </div>
            </div>
        </div>
    )
}