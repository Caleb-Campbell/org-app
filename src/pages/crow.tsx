import Layout from "~/components/layout"
import React, { useState } from "react"
import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import Collapsible from "~/components/Collapsible";


type PreflightData = {
    id: number,
    question: string,
    answer: string,
    isComplete: boolean,
    edit: boolean
}

type StepData = {
    id: number,
    title: string,
    snippet: string,
    edit: boolean
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
                    edit: false
                },
                {
                    id: 2,
                    question: 'Who requested this feature?',
                    answer: 'Bob the client',
                    isComplete: false,
                    edit: false
                },
            ],
            steps: [
                // {
                //     id: 1,
                //     title: 'Created email template',
                //     snippet: 'const emailTemplate = () => {...}',
                //     edit: false
                // },
                // {
                //     id: 2,
                //     title: 'ran yarn install',
                //     snippet: 'yarn install',
                //     edit: false
                // },
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
                    edit: false
                },
                {
                    id: 2,
                    question: 'Who requested this feature?',
                    answer: 'Bob the client',
                    isComplete: false,
                    edit: false
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
             <CrowEditor setCrow={setSelectedCrow} crow={selectedCrow}  />
             <NewCrowModal createCrow={createCrow} show={showNewCrowModal} setShow={setShowNewCrowModal} />
                {crows.map((item) => (
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
    setCrow,
}:{
    crow: CrowData | undefined
    setCrow: (crow: CrowData | undefined) => void
}) => {
    const [addStep, setAddStep] = useState<boolean>(false)
    const [tempValues, setTempValues] = useState<{title: string, snippet: string}>({title: '', snippet: ''})
    const [edits, setEdits] = useState<{
        preflight: boolean
        steps: boolean
    }>()

    const handleAdd = () => {
        const newStep: StepData = {
            id: 1,
            title: tempValues.title,
            snippet: tempValues.snippet,
            edit: false
        }
        if(!crow) {
            throw new Error('Crow is undefined')
            return
        }
        setCrow({...crow, steps: [...crow.steps, newStep]})
    }

    const close = () => {
        setCrow(undefined)
        setTempValues({title: '', snippet: ''})
    }

    if (crow) return (
        <div className="absolute top-0 left-0 w-screen h-screen flex items-center justify-center">
            <div className="absolute z-10 top-0 left-0 w-screen h-screen flex items-center justify-center bg-background bg-opacity-90" onClick={close} />
                    <p className="text-center text-2xl z-20 uppercase bg-background rounded-lg p-4 absolute  border-gray-500 top-10 mx-auto">{crow.issue}</p>
                <div className="w-3/5 z-20 h-3/12 rounded-lg p-10  border-gray-500 bg-background">
                    <div className="flex flex-col gap-4 w-10/12 mx-auto">
                        <div className="flex flex-col gap-4 ">
                            <Collapsible title="Preflight Check">
                            <input onClick={()=>setEdits({
                                preflight: !edits?.preflight,
                                steps: Boolean(edits?.steps)
                            })} type="checkbox" name="preflight" className="toggle absolute right-3 z-30 top-3" checked />
                            
                            {crow.preflight.map((item) => (
                                <div className="flex flex-col gap-4" key={item.id}>
                                    <div className="form-control ">
                                        <label className="label">
                                            {
                                                edits?.preflight ? (
                                                    <input className="w-full p-1 rounded-lg" onBlur={} value={item.question} />
                                                ):(
                                                    <span className="label-text">{item.question}</span>
                                                )
                                            }
                                        </label>
                                        <textarea className="input input-bordered mx-auto w-full h-9 rounded-none focus:outline-none bg-cardground bg-opacity-70 p-1 px-3" />
                                    </div>
                                </div>
                            ))}
                            </Collapsible>
                        </div>
                        <div className="flex flex-col gap-4">
                            <Collapsible title="Steps">


                            <button onClick={()=>setAddStep(!addStep)} className="bg-cardground h-9 ml-2 px-3 rounded">{addStep ? 'Cancel' : 'Add Step'}</button>
                            {
                                addStep && (
                                    <div className="w-2/3 mx-auto z-20 h-8/12  rounded-lg p-3 border border-gray-500 bg-background">
                                    <label>{`Add a step`}</label>
                                    <div className="flex">
                                    <input className="input input-bordered w-10/12 h-9 rounded-none focus:outline-none bg-cardground bg-opacity-70 p-1 px-3" placeholder="Title" value={tempValues.title} onChange={(e)=>setTempValues({...tempValues, title: e.target.value})} />
                                    <button className="bg-cardground h-9 ml-2 px-3 rounded" onClick={handleAdd} >Add</button>
                                    </div>
                                </div>
                                )
                            }
                            {crow.steps.map((item) => (
                                <div className="flex flex-col gap-4" key={item.id}>
                            <div className="flex mt-12 justify-between items-end">
                            <p className="text-2xl capitalize">{item.title}</p>
                            <button className="btn btn-outline btn-warning w-2/12">Remove</button>
                            </div>
                            <CodeMirror
                            value={tempValues.snippet}
                            width="500px"
                            height="30vh"
                            minWidth="100%"
                            minHeight="30vh"
                            extensions={[
                                markdown({ base: markdownLanguage, codeLanguages: languages }),
                            ]}
                            onChange={(value) => setTempValues({...tempValues, snippet: value})}
                            className="codemirror-container"
                            />
                          </div>
                            ))}
                            </Collapsible>
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