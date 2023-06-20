import { markdown, markdownLanguage } from "@codemirror/lang-markdown"
import { languages } from "@codemirror/language-data"
import { useState } from "react"
import Collapsible from "../Collapsible"
import { CrowData, StepData } from "~/pages/crow"
import CodeMirror from "@uiw/react-codemirror";


const CrowEditor = ({
    crow,
    setCrow,
    updateAll
}:{
    crow: CrowData | undefined
    setCrow: (crow: CrowData | undefined) => void
    updateAll: (id: string, crow: CrowData) => void
}) => {
    const [addStep, setAddStep] = useState<boolean>(false)
    const [tempValues, setTempValues] = useState<{title: string, snippet: string, preTitle: string}>({title: '', snippet: '', preTitle: ''})
    const [edits, setEdits] = useState<{
        preflight: boolean
        steps: boolean
    }>()

    const handleAdd = () => {
        const newStep: StepData = {
            id: '1',
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
        setTempValues({title: '', snippet: '', preTitle: ''})
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
                                                    <input className="w-full p-1 rounded-lg" value={item.question} />
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

export default CrowEditor