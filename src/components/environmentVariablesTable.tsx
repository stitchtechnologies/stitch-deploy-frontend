import { useState } from "react"
import { Button } from "./ui/button"
import { Code, Eye, MoreHorizontal } from "lucide-react"
import { Toggle } from "./ui/toggle"
import { Input } from "./ui/input"

export type EnvironmentVariable = {
    key: string
    value: string
}

const EnvrionmentVariableRow = (props: { keyName: string, value: string }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    return (
        <div className="flex gap-4 py-4 px-6 items-center text-sm border-b-[rgba(0,0,0,0.10)] border-b border-solid">
            <div className="font-bold font-robotomono flex flex-1 gap-2 items-center"><Code width={14} height={14} /> {props.keyName}</div>
            <div className="flex gap-2 items-center flex-1">
                <Toggle aria-label="toggle password visability" pressed={isPasswordVisible} onPressedChange={(press) => setIsPasswordVisible(press)} >
                    <Eye width={14} height={14} />
                </Toggle>
                <Input type={isPasswordVisible ? "text" : "password"} value={props.value} />
            </div>
            <Button variant="ghost" size="icon" className="ml-auto">
                <MoreHorizontal className="h-4 w-4" />
            </Button>
        </div>
    )
}

export default function EnvironmentVariablesTable({ environmentVariables }: { environmentVariables: EnvironmentVariable[] }) {
    return (
        <div className="bg-white rounded shadow w-full">
            {
                environmentVariables.map((envVar, index) => {
                    return (
                        <EnvrionmentVariableRow key={envVar.key} keyName={envVar.key} value={envVar.value} />
                    )
                }
                )
            }
        </div>
    )
}