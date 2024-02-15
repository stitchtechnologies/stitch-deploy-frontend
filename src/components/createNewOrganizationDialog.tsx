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

const CreateNewOrganization = () => {
    const [creating, setCreating] = useState(false);
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open}>
            <DialogTrigger className="ml-auto">
                <Button className="px-6" onClick={() => setOpen(true)}>
                    Add new
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create an organization</DialogTitle>
                    <DialogDescription>
                        <form className="flex flex-col gap-4 mt-2" onSubmit={(e: any) => {
                            e.preventDefault()
                            setCreating(true)
                            // sleep for 2 seconds then setcreating to false
                            setTimeout(() => {
                                setCreating(false)
                                setOpen(false)
                            }, 2000)
                        }}>
                            <div className="grid w-full items-center gap-1.5">
                                <Label htmlFor="name">Organization name</Label>
                                <Input type="text" name="name" placeholder="Acme Corporation" />
                            </div>
                            <div className="grid w-full items-center gap-1.5">
                                <Label htmlFor="image">Image</Label>
                                <Input name="image" type="file" />
                            </div>
                            <Button type={"submit"} disabled={creating}>{creating ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Creating</> : "Create"}</Button>
                        </form>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default CreateNewOrganization;