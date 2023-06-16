import Layout from "~/components/layout"
import React, { useState } from "react"
import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";

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


    const [selectedCrow, setSelectedCrow] = useState<CrowData | undefined>(undefined)

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

    return (
        <Layout>
             <div className="grid grid-cols-3 gap-4 p-32"> 
             <CrowEditor setSelectedCrow={setSelectedCrow} crow={selectedCrow}  />
                {data.map((item, index) => (
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
    setSelectedCrow,
}:{
    crow: CrowData | undefined
    setSelectedCrow: (crow: CrowData | undefined) => void
}) => {
    const [code, setCode] = useState<string>("")
    const [title, setTitle] = useState<string>("")

    if (crow) return (
        <div className="absolute top-0 left-0 w-screen h-screen flex items-center justify-center">
            <div className="absolute z-10 top-0 left-0 w-screen h-screen flex items-center justify-center bg-background bg-opacity-90" onClick={()=>{setSelectedCrow(undefined)}} />
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
                                className="bg-cardground bg-opacity-70 p-1 px-3"
                            />
                          </div>
                            ))}
                        </div>
                    </div>
                </div>
        </div>
    )
}