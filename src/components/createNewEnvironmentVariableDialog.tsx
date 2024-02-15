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
import { EnvironmentVariable } from "./environmentVariablesTable";

const NewEnvironmentVariableDialog = ({ onCreated: handleCreated }: { onCreated: (envVar: EnvironmentVariable) => void }) => {
    const [open, setOpen] = useState(false);
    const [creating, setCreating] = useState(false);

    return (
        <Dialog open={open}>
            <DialogTrigger className="ml-auto" asChild>
                <Button className="px-6" onClick={() => setOpen(true)}>
                    Add
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Enter new environment variable</DialogTitle>
                    <DialogDescription>
                        <form className="flex flex-col gap-4 mt-2" onSubmit={(e: any) => {
                            e.preventDefault()
                            setCreating(true)
                            // sleep for 2 seconds then setcreating to false
                            setTimeout(() => {
                                setCreating(false)
                                setOpen(false)
                                handleCreated({
                                    key: e.target["key"].value,
                                    value: e.target["value"].value
                                })
                            }, 2000)
                        }}>
                            <div className="grid w-full items-center gap-1.5">
                                <Label htmlFor="key">Key</Label>
                                <Input type="text" name="key" placeholder="OPEN_AI_KEY" />
                            </div>
                            <div className="grid w-full items-center gap-1.5">
                                <Label htmlFor="value">Value</Label>
                                <Input type="text" name="value" placeholder="sk-rjoir23iuf2o8fu23f" />
                            </div>
                            <Button type={"submit"} disabled={creating}>{creating ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Creating</> : "Create"}</Button>
                        </form>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default NewEnvironmentVariableDialog;