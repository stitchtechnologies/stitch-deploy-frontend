import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const NewUserDialog = ({ onCreated: handleCreated }: { onCreated: (user: any) => void }) => {
    const [open, setOpen] = useState(false);
    const [creating, setCreating] = useState(false);

    return (
        <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
            <DialogTrigger className="ml-auto" asChild>
                <Button className="px-6" onClick={() => setOpen(true)}>
                    Add
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Enter new user details</DialogTitle>
                    <DialogDescription>
                        <form className="flex flex-col gap-4 mt-2" onSubmit={(e: any) => {
                            e.preventDefault()
                            setCreating(true)
                            // sleep for 2 seconds then setcreating to false
                            setTimeout(() => {
                                setCreating(false)
                                setOpen(false)
                                handleCreated({
                                    name: e.target["name"].value,
                                    email: e.target["email"].value
                                })
                            }, 2000)
                        }}>
                            <div className="grid w-full items-center gap-1.5">
                                <Label htmlFor="name">Name</Label>
                                <Input type="text" name="name" placeholder="Sam Altman" />
                            </div>
                            <div className="grid w-full items-center gap-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input type="email" name="email" placeholder="sama@openai.com" />
                            </div>
                            <Button type={"submit"} disabled={creating}>{creating ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Creating</> : "Create"}</Button>
                        </form>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default NewUserDialog;