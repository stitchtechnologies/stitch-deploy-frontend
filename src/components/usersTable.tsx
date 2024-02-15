import { useState } from "react"
import { Button } from "./ui/button"
import { Code, Eye, MinusCircle, MoreHorizontal, UserRound } from "lucide-react"
import { Toggle } from "./ui/toggle"
import { Input } from "./ui/input"

export type User = {
    name: string;
    email: string;
}

const UserRow = ({ user }: { user: User }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    return (
        <div className="flex gap-4 py-4 px-6 items-center text-sm border-b-[rgba(0,0,0,0.10)] border-b border-solid">
            <div className="flex flex-1 gap-2 items-center"><UserRound width={14} height={14} /> {user.name} ({user.email})</div>
            <Button variant="ghost" size="icon" className="ml-auto">
                <MinusCircle className="h-4 w-4" />
            </Button>
        </div>
    )
}

export default function UsersTable({ users }: { users: User[] }) {
    return (
        <div className="bg-white rounded shadow w-full">
            {
                users.map((user, index) => {
                    return (
                        <UserRow key={index} user={user} />
                    )
                }
                )
            }
        </div>
    )
}