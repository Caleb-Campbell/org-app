import Layout from "~/components/layout"
import React, { useState } from "react"
import CrowEditor from "~/components/crow/CrowEditor";
import Modal from "~/components/Modal";
import { useSession } from "next-auth/react";

export type PreflightData = {
    id: string,
    question: string,
    answer: string,
    isComplete: boolean,
    edit: boolean
}

export type StepData = {
    id: string,
    title: string,
    snippet: string,
    edit: boolean
}

export type CrowData = {
    id: string,
    issue: string,
    isOpen: boolean,
    preflight: PreflightData[],
    steps: StepData[],
}

const Crow = () => {

    // const data: CrowData[] = [
    //     {
    //         id: 1,
    //         issue: "Add welcome email for new users",
    //         isOpen: true,
    //         preflight: [
    //             {
    //                 id: 1,
    //                 question: 'Why does the user need this feature?',
    //                 answer: 'So they can feel welcomed to the app',
    //                 isComplete: false,
    //                 edit: false
    //             },
    //             {
    //                 id: 2,
    //                 question: 'Who requested this feature?',
    //                 answer: 'Bob the client',
    //                 isComplete: false,
    //                 edit: false
    //             },
    //         ],
    //         steps: [
    //             // {
    //             //     id: 1,
    //             //     title: 'Created email template',
    //             //     snippet: 'const emailTemplate = () => {...}',
    //             //     edit: false
    //             // },
    //             // {
    //             //     id: 2,
    //             //     title: 'ran yarn install',
    //             //     snippet: 'yarn install',
    //             //     edit: false
    //             // },
    //         ]
            
    //     }
    // ]

    const { data: session, status } = useSession();

    const [selectedCrow, setSelectedCrow] = useState<CrowData | undefined>(undefined)
    const [showNewCrowModal, setShowNewCrowModal] = useState<boolean>(false)
    const [crows, setCrows] = useState<CrowData[] | undefined>(undefined)
    const [newCrowTitle, setNewCrowTitle] = useState<string>('')

    const createCrow = (title: string) => {
        const newCrow: CrowData = {
            id: '1',
            issue: title,
            isOpen: true,
            preflight: [
                {
                    id: '1',
                    question: 'Why does the user need this feature?',
                    answer: 'So they can feel welcomed to the app',
                    isComplete: false,
                    edit: false
                },
                {
                    id: '2',
                    question: 'Who requested this feature?',
                    answer: 'Bob the client',
                    isComplete: false,
                    edit: false
                },
            ],
            steps: [],
        }
        if(crows === undefined) {
            setCrows([newCrow])
            return
        }
        setCrows([...crows, newCrow])
    }

    const updateAll = (id: string, crow: CrowData): void => {
        const newCrows = crows?.map((item) => {
            if(item.id === id) {
                item = crow
            }
            return item
        })
        setCrows(newCrows)
    } 

    return (
        <Layout needsAuth session={session}>
             <div className="grid grid-cols-3 gap-64 p-32">
                <button onClick={()=>setShowNewCrowModal(!showNewCrowModal)} className="w-9 h-9 rounded-full flex items-center justify-center absolute top-3 mx-auto left-1/2">
                    <i className={`scale-[2] transition-transform ${showNewCrowModal ? 'rotate-45' : ''}`} aria-hidden="true">+</i>
                </button>
             <CrowEditor updateAll={updateAll}  setCrow={setSelectedCrow} crow={selectedCrow}  />

             <Modal show={showNewCrowModal} setShow={setShowNewCrowModal}>
                <div className="w-1/3 z-20 h-8/12  rounded-lg p-3 border border-gray-500 bg-background">
                <label>{`What's your issue?`}</label>
                <div className="flex">
                <input className="input input-bordered w-10/12 h-9 rounded-none focus:outline-none bg-cardground bg-opacity-70 p-1 px-3" placeholder="Title" value={newCrowTitle} onChange={(e)=>setNewCrowTitle(e.currentTarget.value)} />
                <button className="bg-cardground h-9 ml-2 px-3 rounded" onClick={()=>{
                    setShowNewCrowModal(false)
                    createCrow(newCrowTitle)
                    }}>Create</button>
                </div>
            </div>
             </Modal>
                {crows && crows.map((item) => (
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